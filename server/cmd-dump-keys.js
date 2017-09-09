const assert = require('assert');
const bitcore = require('bitcore-lib');
const joi = require('joi');

const readFile = function (thePath, theCompletion) {
	const fs = require('fs');
	return fs.readFile(thePath, theCompletion);
};

const readInput = function (theCompletion) {
	const kInputs = ['/dev/stdin', 'data/solidity_compile.input.json'];
	return readFile(kInputs[0], theCompletion);
};

const createAddressFromBNIndex = function (theBNIndex) {
	// Extended
	const aPrivateKeyExtended = new bitcore.PrivateKey({bn: theBNIndex, compressed: false, network: 'livenet'});
	const aWIFExtended = aPrivateKeyExtended.toWIF();
	const aAddressExtended = aPrivateKeyExtended.toAddress();

	// Compressed
	const aPrivateKeyCompressed = new bitcore.PrivateKey({bn: theBNIndex, compressed: true, network: 'livenet'});
	const aWIFCompressed = aPrivateKeyCompressed.toWIF(); // eslint-disable-line no-unused-vars
	const aAddressCompressed = aPrivateKeyCompressed.toAddress();

	const aCalculatedValue = {
		index: theBNIndex.toString(),
		wif: aWIFExtended.toString(),
		address: {
			extended: aAddressExtended.toString(),
			compressed: aAddressCompressed.toString()
		}
	};
	return aCalculatedValue;
};

readInput((err, crudedata) => {
// Test:
// echo '{"offset":"123", "delta": 256}' | node cmd-dump-keys.js
	if (err) {
		throw (err);
	}	else {
		const aInput = JSON.parse(crudedata.toString());

		const schema = {
			offset: joi.string().required(),
			delta: joi.number().required().integer().min(1).max(256)
		};
		const joiResult = joi.validate(aInput, schema);
		assert.strictEqual(joiResult.error, null);

		const bnOne = bitcore.crypto.BN.fromString('1');
		const bnBegin = bitcore.crypto.BN.fromString(aInput.offset);
		const bnDelta = new bitcore.crypto.BN(aInput.delta);
		const bnEnd = bnBegin.add(bnDelta);

		let bnIter = bitcore.crypto.BN.fromString(aInput.offset);
		const results = [];
		for (; bnIter.toString() !== bnEnd.toString(); bnIter = bnIter.add(bnOne)) {
			results.push(createAddressFromBNIndex(bnIter));
		}
		console.log(JSON.stringify(results));
	}
});
