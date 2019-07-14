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
				createAddressFromBNIndex(theBNIndex, theNetwork) {
					// Extended
					const aPrivateKeyExtended = new bitcore.PrivateKey({bn: theBNIndex, compressed: false, network: theNetwork});
					const aWIFExtended = aPrivateKeyExtended.toWIF();
					const aAddressExtended = aPrivateKeyExtended.toAddress();

					// Compressed
					const aPrivateKeyCompressed = new bitcore.PrivateKey({bn: theBNIndex, compressed: true, network: theNetwork});
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
						theDOM.append(theChild);
					});
					return theDOM;
				},
				removeChildren(theDOM) {
				// https://jsperf.com/innerhtml-vs-removechild/15
					while (theDOM.firstChild) {
						theDOM.removeChild(theDOM.firstChild);
					}
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
				bnPage: null, // BN of current page.
				networkIndex: 0,
				constants: {
					network: ['livenet', 'testnet'],
					bnOne: bitcore.crypto.BN.fromString('1'),
					bnDelta: bitcore.crypto.BN.fromString('64'),
					bnFirstPage: bitcore.crypto.BN.fromString('1'),
					bnLast: bitcore.crypto.BN.fromString('115792089237316195423570985008687907852837564279074904382605163141518161494336'),
					url: new URL(location)
				}
			};
			self.model.constants.bnLastPage = self.model.constants.bnLast.div(self.model.constants.bnDelta);

			if (!self.model.constants.bnLast.mod(self.model.constants.bnDelta).isZero()) {
				self.model.constants.bnLastPage = self.model.constants.bnLastPage.add(self.model.constants.bnOne);
			}

			self.checkPage = theBN => {
				return (theBN.cmp(self.model.constants.bnFirstPage) >= 0) && (theBN.cmp(self.model.constants.bnLastPage) <= 0);
			};

			self.showTableWithTimout = theTimeout => {
				setTimeout(self.showTable, theTimeout);
			};

			self.onClickButton = (theButton, theIncrement) => {
				return function () {
					const nextBnPage = self.model.bnPage.add(theIncrement);
					if (self.checkPage(nextBnPage) === true) {
						self.buttonDisable(theButton);
						self.model.bnPage = nextBnPage;
						self.showTableWithTimout(0);
					}
				};
			};

			self.onClickButtonNetwork = (theButton1, theButton2, theNetworkIndex) => {
				return function () {
					theButton1.classList.remove('normal');
					theButton1.classList.add('ig_button_network_selected');
					theButton2.classList.remove('ig_button_network_selected');
					theButton2.classList.add('normal');
					self.model.networkIndex = theNetworkIndex;
					self.showTableWithTimout(0);
				};
			};

			self.buildPageLink = (textContent, page) => {
				let {origin} = self.model.constants.url;
				if (origin === 'null') {
					origin = 'file://';
				}

				return self.util.createElement('a', {textContent, href: origin + self.model.constants.url.pathname + '?page=' + page + '&network=' + self.model.networkIndex});
			};

			self.buildDOMPageNumber = () => {
				const aDOMLinkToFirstPage = self.buildPageLink('first', self.model.constants.bnFirstPage.toString());
				const aDOMSeparator1 = self.util.createElement('span', {textContent: ' || '});
				const aDOMLinkToActualPage = self.buildPageLink(self.model.bnPage.toString(), self.model.bnPage.toString());
				const aDOMSeparator2 = self.util.createElement('span', {textContent: ' || '});
				const aDOMLinkToMaxPage = self.buildPageLink('last', self.model.constants.bnLastPage.toString());
				const fragment = document.createDocumentFragment();
				return self.util.appendChildren(fragment, [aDOMLinkToFirstPage, aDOMSeparator1, aDOMLinkToActualPage, aDOMSeparator2, aDOMLinkToMaxPage]);
			};

			self.showTable = () => {
				const aStartDate = new Date();
				const {bnOne} = self.model.constants;
				const {bnDelta} = self.model.constants;
				const bnPage = self.model.bnPage.sub(bnOne);
				const bnBegin = bnPage.mul(bnDelta).add(bnOne);
				let bnEnd = bnBegin.add(bnDelta);
				if (bnEnd.gt(self.model.constants.bnLast)) {
					bnEnd = self.model.constants.bnLast.add(self.model.constants.bnOne);
				}

				const bnMaxNumberOfIndex = self.model.constants.bnLast;
				const bnMaxPages = self.model.constants.bnLastPage;
				const aDOMHeader = self.util.createElement('h2', {textContent: 'Bitcoin private key database'});
				const aDOMPageNumber = self.util.createElement('li');
				aDOMPageNumber.append(self.buildDOMPageNumber(bnMaxPages));
				const aDOMKeysPerPage = self.util.createElement('li', {textContent: 'Private keys per page: ' + bnDelta.toString()});
				const aDOMNumberOfIndex = self.util.createElement('li', {textContent: 'Total: ' + bnMaxNumberOfIndex.toString() + ' private keys'});

				const aDOMUlHeader = self.util.createElement('ul');
				self.util.appendChildren(aDOMUlHeader, [aDOMPageNumber, aDOMKeysPerPage, aDOMNumberOfIndex]);
				const styles = ['disabled', 'normal'];
				const aPrevButton = self.util.createElement('span', {textContent: '< Previous'}, ['ig_button', styles[(self.model.bnPage.cmp(self.model.constants.bnFirstPage) > 0) | 0]]);
				aPrevButton.addEventListener('click', self.onClickButton(aPrevButton, bnOne.neg()));
				const aNextButton = self.util.createElement('span', {textContent: 'Next > '}, ['ig_button', styles[(self.model.bnPage.cmp(self.model.constants.bnLastPage) < 0) | 0]]);
				aNextButton.addEventListener('click', self.onClickButton(aNextButton, bnOne));

				const chooseClass = function (theNetworkIndex) {
					const kVect = ['normal', 'ig_button_network_selected'];
					return kVect[Number(self.model.networkIndex === theNetworkIndex)];
				};

				const aLivenetButton = self.util.createElement('span', {textContent: 'Livenet'}, ['ig_button_network', 'ig_button_network_left', chooseClass(0)]);
				const aTestnetButton = self.util.createElement('span', {textContent: 'Testnet'}, ['ig_button_network', 'ig_button_network_right', chooseClass(1)]);
				aLivenetButton.addEventListener('click', self.onClickButtonNetwork(aLivenetButton, aTestnetButton, 0));
				aTestnetButton.addEventListener('click', self.onClickButtonNetwork(aTestnetButton, aLivenetButton, 1));

				const aDOMTableWrapper = document.querySelector('#tableWrapper');
				const aDOMContent = self.util.createElement('table');

				setTimeout(() => {
					const bn = [];
					const random = true;
					for (let bnIter = bnBegin; bnIter.lt(bnEnd); bnIter = bnIter.add(bnOne)) {
						if (random) {
							const aRandomKey = new bitcore.PrivateKey();
							const aRandomBn = bitcore.crypto.BN.fromString(aRandomKey.bn.toString());
							bn.push(aRandomBn);
						} else {
							bn.push(bnIter);
						}
					}

					const results = bn.map(theIndex => {
						return self.util.createAddressFromBNIndex(theIndex, self.model.constants.network[self.model.networkIndex]);
					});
					const buildField = function (element, boolCompressed) { // eslint-disable-line no-unused-vars
						const fieldName = ['extended', 'compressed'];
						return 'wif:\t' + element.wif[fieldName[Number(boolCompressed)]] + '\naddress:\t' + element.address[fieldName[Number(boolCompressed)]];
					};

					const buildLiFieldsIndex = function (element) {
						const aDOMLiIndexDec = self.util.createElement('li', {textContent: 'dec: ' + element.index.dec});
						const aDOMLiIndexHex = self.util.createElement('li', {textContent: 'hex: 0x' + element.index.hex});
						return [aDOMLiIndexDec, aDOMLiIndexHex];
					};

					const buildLiFields = function (element, boolCompressed) {
					// https://blockchair.com/bitcoin/address/1CK6KHY6MHgYvmRQ4PAafKYDrg1ejbH1cE
					// https://blockstream.info/address/1CK6KHY6MHgYvmRQ4PAafKYDrg1ejbH1cE // Fixed, it was: "Ci dispiace! Indirizzi con tante transazioni non sono supportate al momento"
						const fieldName = ['extended', 'compressed'];
						const network = ['', 'testnet/'];
						const aDOMLiWif = self.util.createElement('li', {textContent: 'wif: ' + element.wif[fieldName[Number(boolCompressed)]]});
						const aDOMLiAddress = self.util.createElement('li', {textContent: 'address: '});
						const aDOMHref = self.util.createElement('a', {target: '_blank', href: 'https://blockstream.info/' + network[self.model.networkIndex] + 'address/' + element.address[fieldName[Number(boolCompressed)]], textContent: element.address[fieldName[Number(boolCompressed)]]});
						aDOMLiAddress.append(aDOMHref);
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

							aDOMTd.append(aDOMUl);
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
					aDOMContent.append(aDOMTr);
					self.util.appendChildren(aDOMContent, aDOMTrs);
					// ADOMContent.innerHTML = JSON.stringify(results, null, 8);
					[aPrevButton, aNextButton].forEach(theButton => {
						self.buttonEnable(theButton);
					});
					const aDOMDonation = self.util.createElement('div', {textContent: 'It took a lot of computing power to generate this database. Donations welcome: 1ALL13199J1n4cDQ276We3wctwr11xB8Rn'}, ['crono']);
					const aDOMCrono = self.util.createElement('div', {textContent: 'ticks: …'}, ['crono']);

					self.util.removeChildren(aDOMTableWrapper);
					self.util.appendChildren(aDOMTableWrapper, [aDOMHeader, aDOMUlHeader, aPrevButton, aNextButton, aLivenetButton, aTestnetButton]);
					self.util.appendChildren(aDOMTableWrapper, [aDOMCrono, aDOMContent, aDOMDonation]);

					setTimeout(() => {
						const aEndDate = new Date();
						aDOMCrono.textContent = 'ticks: ' + (aEndDate - aStartDate);
					}, 0);
				}, 0);
			};

			self.getOrDefault = (params, field, defaultValue) => {
				let ret = params.get(field);
				if (ret === null) {
					ret = defaultValue;
				}

				return ret;
			};

			self.show = () => {
				const url = new URL(location);
				let {origin} = url;
				if (origin === 'null') {
					origin = 'file://';
				}

				const path = origin + url.pathname;
				console.log(path);
				const params = url.searchParams;

				const aPageString = self.getOrDefault(params, 'page', '1');
				self.model.bnPage = bitcore.crypto.BN.fromString(aPageString);

				const aNetworkIndexString = self.getOrDefault(params, 'network', '0');
				self.model.networkIndex = parseInt(aNetworkIndexString, 10);

				self.showTableWithTimout(0);
			};
		};

		gController = new ClassController(new Date());
		gController.show();
	});
})();
