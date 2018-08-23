// Vanilla, MVC semantic paradigma: no jquery, no angular, no innerHTML; just javascript.
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
				createAddressFromBNIndexOld(theBNIndex) {
					return {
						index: theBNIndex.toString(),
						addresses: [false, true].map(compressed => {
							const aPrivateKey = new bitcore.PrivateKey({bn: theBNIndex, compressed, network: 'livenet'});
							const aWIF = aPrivateKey.toWIF();
							const aAddress = aPrivateKey.toAddress();
							return {compressed, wif: aWIF.toString(), address: aAddress.toString()};
						})
					};
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

					self.util.assert(aPrivateKeyExtended.toString() === aPrivateKeyCompressed.toString());

					const aCalculatedValue = {
						index: {
							dec: theBNIndex.toString(),
							hex: aPrivateKeyExtended.toString()
						},
						key: {
							extended: aPrivateKeyExtended.toString(),
							compressed: aPrivateKeyCompressed.toString()
						},
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
				},
				appendChildren(theDOM, theChildren) {
					theChildren.forEach(theChild => {
						theDOM.appendChild(theChild);
					});
					return theDOM;
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
			self.buildDOMPageNumber = bnMaxPages => {
				const url = new URL(location);
				const path = url.origin + url.pathname;
				const aDOMLinkToActualPage = self.util.createElement('a', {textContent: 'Page ' + self.model.bnPage.toString(), href: path + '?page=' + self.model.bnPage.toString()});
				const aDOMMaxPages = self.util.createElement('span', {textContent: ' out of ' + bnMaxPages.toString()});
				const fragment = document.createDocumentFragment();
				return self.util.appendChildren(fragment, [aDOMLinkToActualPage, aDOMMaxPages]);
			};
			self.showTable = () => {
				const aStartDate = new Date();
				const bnOne = bitcore.crypto.BN.fromString('1');
				const bnDelta = bitcore.crypto.BN.fromString('64');
				const bnPage = self.model.bnPage.sub(bnOne);
				const bnBegin = bnPage.mul(bnDelta).add(bnOne);
				const bnEnd = bnBegin.add(bnDelta);
				const bnMaxNumberOfIndex = bitcore.crypto.BN.fromString('115792089237316195423570985008687907852837564279074904382605163141518161494336');
				const bnMaxPages = bnMaxNumberOfIndex.div(bnDelta);
				const aDOMHeader = self.util.createElement('h2', {textContent: 'Bitcoin private key database'});
				const aDOMPageNumber = self.util.createElement('li');
				aDOMPageNumber.appendChild(self.buildDOMPageNumber(bnMaxPages));
				const aDOMKeysPerPage = self.util.createElement('li', {textContent: 'Private keys per page: ' + bnDelta.toString()});
				const aDOMNumberOfIndex = self.util.createElement('li', {textContent: 'Total: ' + bnMaxNumberOfIndex.toString() + ' private keys'});

				const aDOMUlHeader = self.util.createElement('ul');
				self.util.appendChildren(aDOMUlHeader, [aDOMPageNumber, aDOMKeysPerPage, aDOMNumberOfIndex]);
				const aPrevButton = self.util.createElement('span', {textContent: 'Previous'}, ['ig_button', 'normal']);
				aPrevButton.addEventListener('click', self.onClickButton(aPrevButton, bnOne.neg()));
				const aNextButton = self.util.createElement('span', {textContent: 'Next'}, ['ig_button', 'normal']);
				aNextButton.addEventListener('click', self.onClickButton(aNextButton, bnOne));
				const aDOMTableWrapper = document.getElementById('tableWrapper');
				aDOMTableWrapper.innerHTML = null;
				const aDOMContent = self.util.createElement('table');
				self.util.appendChildren(aDOMTableWrapper, [aDOMHeader, aDOMUlHeader, aPrevButton, aNextButton]);
				setTimeout(() => {
					const bn = [];
					for (let bnIter = bnBegin; bnIter.lt(bnEnd); bnIter = bnIter.add(bnOne)) {
						bn.push(bnIter);
					}
					const results = bn.map(theIndex => {
						return self.util.createAddressFromBNIndex(theIndex);
					});
					const buildField = function (element, boolCompressed) { // eslint-disable-line no-unused-vars
						const fieldName = ['extended', 'compressed'];
						return 'wif:\t' + element.wif[fieldName[Number(boolCompressed)]] + '\naddress:\t' + element.address[fieldName[Number(boolCompressed)]];
					};

					const buildLiFieldsIndex = function (element) { // eslint-disable-line no-unused-vars
						const aDOMLiIndexDec = self.util.createElement('li', {textContent: 'dec: ' + element.index.dec});
						const aDOMLiIndexHex = self.util.createElement('li', {textContent: 'hex: ' + element.index.hex});
						return [aDOMLiIndexDec, aDOMLiIndexHex];
					};

					const buildLiFields = function (element, boolCompressed) {
					// https://blockchair.com/bitcoin/address/1CK6KHY6MHgYvmRQ4PAafKYDrg1ejbH1cE
						const fieldName = ['extended', 'compressed'];

						const aDOMLiWif = self.util.createElement('li', {textContent: 'wif: ' + element.wif[fieldName[Number(boolCompressed)]]});
						const aDOMLiAddress = self.util.createElement('li', {textContent: 'address: '});
						const aDOMHref = self.util.createElement('a', {href: 'https://blockchair.com/bitcoin/address/' + element.address[fieldName[Number(boolCompressed)]], textContent: element.address[fieldName[Number(boolCompressed)]]});
						aDOMLiAddress.appendChild(aDOMHref);
						return [aDOMLiWif, aDOMLiAddress];
					};
					const styles = ['background-darkgray', 'background-gray', 'background-lightgray'];
					const aDOMTrs = results.map((element, index) => {
						const aDOMTds = [
							buildLiFieldsIndex(element),
							buildLiFields(element, false),
							buildLiFields(element, true)
						].map(theLiFields => {
							const aDOMTd = self.util.createElement('td');
							const aDOMUl = self.util.createElement('ul');
							self.util.appendChildren(aDOMUl, theLiFields);

							aDOMTd.appendChild(aDOMUl);
							return aDOMTd;
						});
						const aDOMTr = self.util.createElement('tr', null, [styles[index % (styles.length)]]);
						self.util.appendChildren(aDOMTr, aDOMTds);
						return aDOMTr;
					});
					const aDOMThs = ['private key', 'extended', 'compressed'].map(head => {
						return self.util.createElement('th', {textContent: head});
					});
					const aDOMTr = self.util.createElement('tr');
					self.util.appendChildren(aDOMTr, aDOMThs);
					aDOMContent.appendChild(aDOMTr);
					self.util.appendChildren(aDOMContent, aDOMTrs);
					// ADOMContent.innerHTML = JSON.stringify(results, null, 8);
					[aPrevButton, aNextButton].forEach(theButton => {
						self.buttonEnable(theButton);
					});
					const aDOMDonation = self.util.createElement('div', {textContent: 'It took a lot of computing power to generate this database. Donations welcome: 1ALL13199J1n4cDQ276We3wctwr11xB8Rn'}, ['crono']);
					const aEndDate = new Date();
					const aDOMCrono = self.util.createElement('div', {textContent: 'ticks: ' + (aEndDate - aStartDate)}, ['crono']);
					self.util.appendChildren(aDOMTableWrapper, [aDOMCrono, aDOMContent, aDOMDonation]);
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
