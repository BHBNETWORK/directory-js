const assert = require('assert');
const bitcore = require('bitcore-lib');

const testBitcore = function () {
	const kReferences = [
		{
			// The first at http://directory.io
			index: '1',
			wif: '5HpHagT65TZzG1PH3CSu63k8DbpvD8s5ip4nEB3kEsreAnchuDf',
			address: {
				extended: '1EHNa6Q4Jz2uvNExL497mE43ikXhwF6kZm',
				compressed: '1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH'
			}
		},
		{
			// Just a random one at http://directory.io/123
			index: '15710',
			wif: '5HpHagT65TZzG1PH3CSu63k8DbpvD8s5ip4nEB3kEssAj43uVyc',
			address: {
				extended: '1Ky6xofrbNDAg6nyrcKx2nD6AsvXhXeLmJ',
				compressed: '18nQk4tQHfgcxoEzeFq8ceEUAANw7BYPko'
			}
		},
		{
			// The last at http://directory.io/904625697166532776746648320380374280100293470930272690489102837043110636675
			index: '115792089237316195423570985008687907852837564279074904382605163141518161494336',
			wif: '5Km2kuu7vtFDPpxywn4u3NLpbr5jKpTB3jsuDU2KYEqetqj84qw',
			address: {
				extended: '1JPbzbsAx1HyaDQoLMapWGoqf9pD5uha5m',
				compressed: '1GrLCmVQXoyJXaPJQdqssNqwxvha1eUo2E'
			}
		}
	];
	kReferences.forEach(aReference => {
		const aBN = bitcore.crypto.BN.fromString(aReference.index);

		// Extended
		const aPrivateKeyExtended = new bitcore.PrivateKey({bn: aBN, compressed: false, network: 'livenet'});
		const aWIFExtended = aPrivateKeyExtended.toWIF();
		const aAddressExtended = aPrivateKeyExtended.toAddress();

		// Compressed
		const aPrivateKeyCompressed = new bitcore.PrivateKey({bn: aBN, compressed: true, network: 'livenet'});
		const aWIFCompressed = aPrivateKeyCompressed.toWIF(); // eslint-disable-line no-unused-vars
		const aAddressCompressed = aPrivateKeyCompressed.toAddress();

		const aCalculatedValue = {
			index: aReference.index,
			wif: aWIFExtended.toString(),
			address: {
				extended: aAddressExtended.toString(),
				compressed: aAddressCompressed.toString()
			}
		};
		console.log({reference: aReference, calculated: aCalculatedValue});
		assert.strictEqual(JSON.stringify(aReference), JSON.stringify(aCalculatedValue));
	});
	console.log('test-bitcore-lib ok');
};

testBitcore();
