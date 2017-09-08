const assert = require('assert');
const bitcoin = require('bitcoinjs-lib');
const BigInteger = require('bigi');

const newBI = function (i) {
	return BigInteger.valueOf(i);
};

const testRandomAddress = function () {
	// for testing only
	function rng () { return new Buffer('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz') }

	// generate random keyPair
	var keyPair = bitcoin.ECPair.makeRandom({ rng: rng })
	var address = keyPair.getAddress()

	assert.strictEqual(address, '1F5VhMHukdnUES9kfXqzPzMeF1GPHKiF64')
	console.log ("bitcoinjs-lib 'testRandomAddress' ok");
}


testRandomAddress ();