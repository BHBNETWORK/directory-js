# Directory-js - Server - Test

* [test-bitcoinjs-lib.js](#test-bitcoinjs-libjs)
* [test-bitcore.js](#test-bitcorejs)
* [test-http-server.js](#test-http-serverjs)
* [calculate-number-of-universal-age.js](#calculate-number-of-universal-agejs)
* [cmd-dump-keys.js](#cmd-dump-keysjs)

## test-bitcoinjs-lib.js

[test-bitcoinjs-lib.js](test/test-bitcoinjs-lib.js)

```
$ node test/test-bitcoinjs-lib.js
bitcoinjs-lib 'testRandomAddress' ok
```

## test-bitcore.js

[test-bitcore.js](test/test-bitcore.js)

```
$ node test/test-bitcore.js
{ reference:
   { index: '1',
     wif: '5HpHagT65TZzG1PH3CSu63k8DbpvD8s5ip4nEB3kEsreAnchuDf',
     address:
      { extended: '1EHNa6Q4Jz2uvNExL497mE43ikXhwF6kZm',
        compressed: '1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH' } },
  calculated:
   { index: '1',
     wif: '5HpHagT65TZzG1PH3CSu63k8DbpvD8s5ip4nEB3kEsreAnchuDf',
     address:
      { extended: '1EHNa6Q4Jz2uvNExL497mE43ikXhwF6kZm',
        compressed: '1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH' } } }
{ reference:
   { index: '15710',
     wif: '5HpHagT65TZzG1PH3CSu63k8DbpvD8s5ip4nEB3kEssAj43uVyc',
     address:
      { extended: '1Ky6xofrbNDAg6nyrcKx2nD6AsvXhXeLmJ',
        compressed: '18nQk4tQHfgcxoEzeFq8ceEUAANw7BYPko' } },
  calculated:
   { index: '15710',
     wif: '5HpHagT65TZzG1PH3CSu63k8DbpvD8s5ip4nEB3kEssAj43uVyc',
     address:
      { extended: '1Ky6xofrbNDAg6nyrcKx2nD6AsvXhXeLmJ',
        compressed: '18nQk4tQHfgcxoEzeFq8ceEUAANw7BYPko' } } }
{ reference:
   { index: '115792089237316195423570985008687907852837564279074904382605163141518161494336',
     wif: '5Km2kuu7vtFDPpxywn4u3NLpbr5jKpTB3jsuDU2KYEqetqj84qw',
     address:
      { extended: '1JPbzbsAx1HyaDQoLMapWGoqf9pD5uha5m',
        compressed: '1GrLCmVQXoyJXaPJQdqssNqwxvha1eUo2E' } },
  calculated:
   { index: '115792089237316195423570985008687907852837564279074904382605163141518161494336',
     wif: '5Km2kuu7vtFDPpxywn4u3NLpbr5jKpTB3jsuDU2KYEqetqj84qw',
     address:
      { extended: '1JPbzbsAx1HyaDQoLMapWGoqf9pD5uha5m',
        compressed: '1GrLCmVQXoyJXaPJQdqssNqwxvha1eUo2E' } } }
test-bitcore-lib ok
```

## test-http-server.js

[test-http-server.js](test/test-http-server.js)

```
$ node test/test-http-server.js
```

http://localhost:9615/?index=668&debug=true

```
$ curl "http://localhost:9615/?index=668&debug=true"
url-parse:
{
        "index": "668",
        "debug": "true"
}
```

## calculate-number-of-universal-age.js

[calculate-number-of-universal-age.js](test/calculate-number-of-universal-age.js)

```
$ node server/test/calculate-number-of-universal-age.js | jq
{
  "addresses": "115792089237316195423570985008687907852837564279074904382605163141518161494336",
  "globalHashingPower": "1000000000000000000000000000000000000",
  "years": "3669229891921952094695762193851494",
  "universeAge": "13820000000",
  "numberOfUniversalAge": "265501439357594218140069"
}
```

## cmd-dump-keys.js

[cmd-dump-keys.js](../server/cmd-dump-keys.js)

```
echo '{"offset":{"index":"1157920892289", "base":10}, "delta": 64, "network":"livenet"}' | node server/cmd-dump-keys.js | jq

[
  {
    "index": {
      "dec": "1157920892289",
      "hex": "010d9976a581"
    },
    "key": {
      "extended": "010d9976a581",
      "compressed": "010d9976a581"
    },
    "publicKey": {
      "extended": "0488a2b22d1c11954228d9741e6b735e09a4d2d9c521f29de9ae0f0c89b3bc739374200e258c10f99de44867e3054ed27f22d5a0a02bb2329e0373e7ebd2316621",
      "compressed": "0388a2b22d1c11954228d9741e6b735e09a4d2d9c521f29de9ae0f0c89b3bc7393"
    },
    "wif": {
      "extended": "5HpHagT65TZzG1PH3CSu63k8DbpvD8s5ip4nEB7BGwhxqUNNDjo",
      "compressed": "KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9cGMNToSpWaZJEp"
    },
    "address": {
      "extended": "1JtLb3nB3wdcSzthBsTydMAWtWZNU4zvDT",
      "compressed": "1Kwz4kx4P9Few3cRyvCoE9B1P3Bvnfa4Zj"
    }
  },
  {…omissis…},
  {
    "index": {
      "dec": "1157920892352",
      "hex": "010d9976a5c0"
    },
    "key": {
      "extended": "010d9976a5c0",
      "compressed": "010d9976a5c0"
    },
    "publicKey": {
      "extended": "0461b6e724deba14b814d22f331278c3fd8f088c1b40dd603bf1f55316d8fb8e28a16f9a6297a2c89d7d1220e72af2c1d9b7761245598079f3647d6e70314baeae",
      "compressed": "0261b6e724deba14b814d22f331278c3fd8f088c1b40dd603bf1f55316d8fb8e28"
    },
    "wif": {
      "extended": "5HpHagT65TZzG1PH3CSu63k8DbpvD8s5ip4nEB7BGwhxxcBBAip",
      "compressed": "KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9cGMNTozC8ofNkN"
    },
    "address": {
      "extended": "1NuCmmmWJKHWh4N22BLouj2uN3VZDmHJAr",
      "compressed": "14kpdj9h7j3i4umcB4zDiJSqUbjXqKrbEW"
    }
  }
]
```
