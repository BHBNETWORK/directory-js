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

const createAddressFromIndex = function (theStringIndex) {
	const aBN = bitcore.crypto.BN.fromString(theStringIndex);

	// Extended
	const aPrivateKeyExtended = new bitcore.PrivateKey({bn: aBN, compressed: false, network: 'livenet'});
	const aWIFExtended = aPrivateKeyExtended.toWIF();
	const aAddressExtended = aPrivateKeyExtended.toAddress();

	// Compressed
	const aPrivateKeyCompressed = new bitcore.PrivateKey({bn: aBN, compressed: true, network: 'livenet'});
	const aWIFCompressed = aPrivateKeyCompressed.toWIF(); // eslint-disable-line no-unused-vars
	const aAddressCompressed = aPrivateKeyCompressed.toAddress();

	const aCalculatedValue = {
		index: theStringIndex,
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
		console.log(aInput);
		const schema = {
			offset: joi.string().required(),
			delta: joi.number().required().integer().min(1).max(256)
		};
		const joiResult = joi.validate(aInput, schema);
		assert.strictEqual(joiResult.error, null);
		console.log(joiResult);
		const aElement = createAddressFromIndex(aInput.offset);
		console.log({aElement});
	}
});
