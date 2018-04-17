const bitcore = require('bitcore-lib'); // eslint-disable-line import/no-unresolved

let gController = null;
(function () {
	'use strict';
	document.addEventListener('DOMContentLoaded', () => {
		const ClassController = function (/* theNow */) {
			const self = this;
			self.util = {
				assert(theAssertion) {
					if (theAssertion !== true) {
						console.log('assertion failed');
					}
				},
				keys: theObject => {
					const ret = [];
					for (const aProperty in theObject) {
						if (theObject.hasOwnProperty(aProperty)) { // eslint-disable-line no-prototype-builtins
							ret.push(aProperty);
						}
					}
					return ret;
				},
				createElement(theTag, theProperties, theClassList) {
					const ret = document.createElement(theTag);
					if ((typeof undefined !== typeof theProperties) && (theProperties !== null)) {
						this.keys(theProperties).forEach(theProperty => {
							ret[theProperty] = theProperties[theProperty];
						});
					}
					if ((typeof undefined !== typeof theClassList) && (theClassList !== null)) {
						theClassList.forEach(theClass => {
							ret.classList.add(theClass);
						});
					}
					return ret;
				},
				createAddressFromBNIndex(theBNIndex) {
					// Extended
					const aPrivateKeyExtended = new bitcore.PrivateKey({bn: theBNIndex, compressed: false, network: 'livenet'});
					const aWIFExtended = aPrivateKeyExtended.toWIF();
					const aAddressExtended = aPrivateKeyExtended.toAddress();

					// Compressed
					const aPrivateKeyCompressed = new bitcore.PrivateKey({bn: theBNIndex, compressed: true, network: 'livenet'});
					const aWIFCompressed = aPrivateKeyCompressed.toWIF();
					const aAddressCompressed = aPrivateKeyCompressed.toAddress();

					const aCalculatedValue = {
						index: theBNIndex.toString(),
						wif: {
							extended: aWIFExtended.toString(),
							compressed: aWIFCompressed.toString()
						},
						address: {
							extended: aAddressExtended.toString(),
							compressed: aAddressCompressed.toString()
						}
					};
					return aCalculatedValue;
				}
			};
			self.model = {
				bnPage: null // BN of current page.
			};
			self.onClickButton = theIncrement => {
				return function () {
					self.model.bnPage = self.model.bnPage.add(theIncrement);
					setTimeout(self.showTable, 0);
				};
			};
			self.showTable = () => {
				const bnOne = bitcore.crypto.BN.fromString('1');
				const bnDelta = bitcore.crypto.BN.fromString('64');
				const bnPage = self.model.bnPage.sub(bnOne);
				const bnBegin = bnPage.mul(bnDelta).add(bnOne);
				const bnEnd = bnBegin.add(bnDelta);
				const aPrevRef = self.util.createElement('span', {textContent: 'Prev', onclick: self.onClickButton(bnOne.neg())}, ['ig_button', 'normal']);
				const aNextRef = self.util.createElement('span', {textContent: 'Next', onclick: self.onClickButton(bnOne)}, ['ig_button', 'normal']);
				const aDOMTableWrapper = document.getElementById('tableWrapper');
				aDOMTableWrapper.innerHTML = null;
				[aPrevRef, aNextRef].forEach(theDOM => {
					aDOMTableWrapper.appendChild(theDOM);
				});
				const results = [];
				for (let bnIter = bnBegin; bnIter.lt(bnEnd); bnIter = bnIter.add(bnOne)) {
					results.push(self.util.createAddressFromBNIndex(bnIter));
				}
				const aContent = self.util.createElement('pre', {textContent: JSON.stringify(results, null, 8)}, ['json']);
				aDOMTableWrapper.appendChild(aContent);
			};

			self.show = () => {
				const url = new URL(location);
				const path = url.origin + url.pathname;
				console.log(path);
				const params = url.searchParams;
				let aPageString = params.get('page');
				if (aPageString === null) {
					aPageString = '1';
				}
				self.model.bnPage = bitcore.crypto.BN.fromString(aPageString);
				setTimeout(self.showTable, 0);
			};
		};
		gController = new ClassController(new Date());
		gController.show();
	});
})();
