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

			self.show = () => {
				const bnOne = bitcore.crypto.BN.fromString('1');
				const bnBegin = bitcore.crypto.BN.fromString('1');
				const bnDelta = bitcore.crypto.BN.fromString('64');
				const bnEnd = bnBegin.add(bnDelta);

				const results = [];
				for (let bnIter = bnOne; bnIter.lt(bnEnd); bnIter = bnIter.add(bnOne)) {
					results.push(self.util.createAddressFromBNIndex(bnIter));
				}
				const aContent = self.util.createElement('pre', {textContent: JSON.stringify(results, null, 8)}, ['json']);
				const aDOMTableWrapper = document.getElementById('tableWrapper');
				aDOMTableWrapper.appendChild(aContent);
			};
		};
		gController = new ClassController(new Date());
		gController.show();
	});
})();
