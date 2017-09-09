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

readInput((err, crudedata) => {
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
	}
});
