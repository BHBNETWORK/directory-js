const assert = require('assert');
const bitcore = require('bitcore-lib');
const joi = require('joi');

const readFile = function (thePath, theCompletion) {
	const fs = require('fs');
	return fs.readFile(thePath, theCompletion);
};

const readInput = function (theCompletion) {
	const kInputs = ['/dev/stdin'];
	return readFile(kInputs[0], theCompletion);
};

const createAddressFromBNIndex = function (theBNIndex, theNetwork) {
	// Extended
	const aPrivateKeyExtended = new bitcore.PrivateKey({bn: theBNIndex, compressed: false, network: theNetwork});
	const aWIFExtended = aPrivateKeyExtended.toWIF();
	const aAddressExtended = aPrivateKeyExtended.toAddress();
	const aPublicKeyExtended = bitcore.PublicKey(aPrivateKeyExtended); // eslint-disable-line new-cap

	// Compressed
	const aPrivateKeyCompressed = new bitcore.PrivateKey({bn: theBNIndex, compressed: true, network: theNetwork});
	const aWIFCompressed = aPrivateKeyCompressed.toWIF();
	const aAddressCompressed = aPrivateKeyCompressed.toAddress();
	const aPublicKeyCompressed = bitcore.PublicKey(aPrivateKeyCompressed); // eslint-disable-line new-cap

	assert(aPrivateKeyExtended.toString() === aPrivateKeyCompressed.toString());

	const aCalculatedValue = {
		index: {
			dec: theBNIndex.toString(),
			hex: aPrivateKeyExtended.toString()
		},
		key: {
			extended: aPrivateKeyExtended.toString(),
			compressed: aPrivateKeyCompressed.toString()
		},
		public_key:{
			extended: aPublicKeyExtended.toString(),
			compressed: aPublicKeyCompressed.toString()
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
};

readInput((err, crudedata) => {
// Test:
// echo '{"offset":"123", "delta": 256, "network":"livenet"}' | node cmd-dump-keys.js
	if (err) {
		throw (err);
	}	else {
		const aInput = JSON.parse(crudedata.toString());

		const schema = {
			offset: joi.string().required(),
			delta: joi.number().required().integer().min(1).max(256),
			network: joi.string().required()
		};
		const joiResult = joi.validate(aInput, schema);
		assert.strictEqual(joiResult.error, null);

		const bnOne = bitcore.crypto.BN.fromString('1');
		const bnBegin = bitcore.crypto.BN.fromString(aInput.offset);
		const bnDelta = new bitcore.crypto.BN(aInput.delta);
		const bnEnd = bnBegin.add(bnDelta);

		const results = [];
		for (let bnIter = bitcore.crypto.BN.fromString(aInput.offset); bnIter.lt(bnEnd); bnIter = bnIter.add(bnOne)) {
			results.push(createAddressFromBNIndex(bnIter, aInput.network));
		}
		console.log(JSON.stringify(results));
	}
});
