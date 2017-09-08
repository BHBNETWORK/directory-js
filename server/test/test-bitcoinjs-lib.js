const assert = require('assert');
const bitcoin = require('bitcoinjs-lib');
const BigInteger = require('bigi');

// eslint-disable-next-line no-unused-vars
const newBI = function (i) {
	return BigInteger.valueOf(i);
};

const testRandomAddress = function () {
	// For testing only
	function rng() {
		return Buffer.from('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz');
	}

	// Generate random keyPair
	const keyPair = bitcoin.ECPair.makeRandom({rng});
	const address = keyPair.getAddress();

	assert.strictEqual(address, '1F5VhMHukdnUES9kfXqzPzMeF1GPHKiF64');
	console.log('bitcoinjs-lib \'testRandomAddress\' ok');
};

testRandomAddress();
