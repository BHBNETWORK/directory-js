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
			self.buttonDisable = function (theButton) {
				theButton.classList.remove('normal');
				theButton.classList.add('busy');
			};

			self.buttonEnable = function (theButton) {
				theButton.classList.remove('busy');
				theButton.classList.add('normal');
			};
			self.model = {
				bnPage: null // BN of current page.
			};
			self.onClickButton = (theButton, theIncrement) => {
				return function () {
					self.buttonDisable(theButton);
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
				const bnMaxNumberOfIndex = bitcore.crypto.BN.fromString('115792089237316195423570985008687907852837564279074904382605163141518161494336');
				const bnMaxPages = bnMaxNumberOfIndex.div(bnDelta);
				const aDOMPageNumber = self.util.createElement('h2', {textContent: 'Page ' + self.model.bnPage.toString() + ' of ' + bnMaxPages.toString()});
				const aDOMNumberOfIndex = self.util.createElement('h3', {textContent: 'Total: ' + bnMaxNumberOfIndex.toString()});
				const aPrevButton = self.util.createElement('span', {textContent: 'Previous'}, ['ig_button', 'normal']);
				aPrevButton.addEventListener('click', self.onClickButton(aPrevButton, bnOne.neg()));
				const aNextButton = self.util.createElement('span', {textContent: 'Next'}, ['ig_button', 'normal']);
				aNextButton.addEventListener('click', self.onClickButton(aNextButton, bnOne));
				const aDOMTableWrapper = document.getElementById('tableWrapper');
				aDOMTableWrapper.innerHTML = null;
				[aDOMPageNumber, aDOMNumberOfIndex, aPrevButton, aNextButton].forEach(theDOM => {
					aDOMTableWrapper.appendChild(theDOM);
				});
				setTimeout(() => {
					const results = [];
					for (let bnIter = bnBegin; bnIter.lt(bnEnd); bnIter = bnIter.add(bnOne)) {
						results.push(self.util.createAddressFromBNIndex(bnIter));
					}
					const aContent = self.util.createElement('pre', {textContent: JSON.stringify(results, null, 8)}, ['json']);
					aDOMTableWrapper.appendChild(aContent);
					[aPrevButton, aNextButton].forEach(theButton => {
						self.buttonEnable(theButton);
					});
				}, 0);
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
