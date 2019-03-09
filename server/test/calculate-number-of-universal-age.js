'use strict';

const bitcore = require('bitcore-lib');

const main = () => {
	// Number of Bitcoin P2PKH addresses
	const addresses = bitcore.crypto.BN.fromString('115792089237316195423570985008687907852837564279074904382605163141518161494336');
	const population = bitcore.crypto.BN.fromString('10000000000'); // 10 miliardi
	const factorPerPerson = bitcore.crypto.BN.fromString('1000000000'); // 1 miliardo
	const doubleHashRate = bitcore.crypto.BN.fromString('100000000000000000'); // 100 mila tera hash/s
	const globalHashingPower = population.mul(factorPerPerson.mul(doubleHashRate)); // population * factorPerPerson * doubleHashRate
	const seconds = addresses.div(globalHashingPower); // addresses / globalHashingPower
	const secondsPerYearBN = bitcore.crypto.BN.fromString(String(3600 * 24 * 365.25)); // seconds per year
	const years = seconds.div(secondsPerYearBN); // seconds / secondsPerYearBN
	const universeAge = bitcore.crypto.BN.fromString(String(13.82 * 1000000000)); // https://it.wikipedia.org/wiki/Età_dell'universo
	const numberOfUniversalAge = years.div(universeAge); // years / universeAge
	console.log(JSON.stringify({
		addresses: addresses.toString(),
		globalHashingPower: globalHashingPower.toString(),
		years: years.toString(),
		universeAge: universeAge.toString(),
		numberOfUniversalAge: numberOfUniversalAge.toString()
	}));
};

main();
