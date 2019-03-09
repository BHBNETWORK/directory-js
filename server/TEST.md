# Directory-js - Server - Test

## test-bitcoinjs-lib.js
```
$ node test/test-bitcoinjs-lib.js
bitcoinjs-lib 'testRandomAddress' ok
```

## test-bitcore.js
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
