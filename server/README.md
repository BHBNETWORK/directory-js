# Directory-js - Server

Creating a `directory.io` website, only using server side nodejs (as `directory.io` do) in 3 different way:

1. [Command line tool](#command-line-tool) (DONE)
2. A basic nodejs.httpServer (TODO)
3. Using `express.js` web application framework (TODO)

---

* [INITIALIZE](INITIALIZE.md)
* [INSTALL](INSTALL.md)
* [TEST](TEST.md)

---

## Command line tool

``` c
$ echo '{"offset":{"index":"1", "base":10}, "delta": 3, "network":"livenet"}' | node server/cmd-dump-keys.js | jq
[[
  {
    "index": {
      "dec": "1",
      "hex": "01"
    },
    "key": {
      "extended": "01",
      "compressed": "01"
    },
    "publicKey": {
      "extended": "0479be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
      "compressed": "0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"
    },
    "wif": {
      "extended": "5HpHagT65TZzG1PH3CSu63k8DbpvD8s5ip4nEB3kEsreAnchuDf",
      "compressed": "KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFU73sVHnoWn"
    },
    "address": {
      "extended": "1EHNa6Q4Jz2uvNExL497mE43ikXhwF6kZm",
      "compressed": "1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH"
    }
  },
  {
    "index": {
      "dec": "2",
      "hex": "02"
    },
    "key": {
      "extended": "02",
      "compressed": "02"
    },
    "publicKey": {
      "extended": "04c6047f9441ed7d6d3045406e95c07cd85c778e4b8cef3ca7abac09b95c709ee51ae168fea63dc339a3c58419466ceaeef7f632653266d0e1236431a950cfe52a",
      "compressed": "02c6047f9441ed7d6d3045406e95c07cd85c778e4b8cef3ca7abac09b95c709ee5"
    },
    "wif": {
      "extended": "5HpHagT65TZzG1PH3CSu63k8DbpvD8s5ip4nEB3kEsreAvUcVfH",
      "compressed": "KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFU74NMTptX4"
    },
    "address": {
      "extended": "1LagHJk2FyCV2VzrNHVqg3gYG4TSYwDV4m",
      "compressed": "1cMh228HTCiwS8ZsaakH8A8wze1JR5ZsP"
    }
  },
  {
    "index": {
      "dec": "3",
      "hex": "03"
    },
    "key": {
      "extended": "03",
      "compressed": "03"
    },
    "publicKey": {
      "extended": "04f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672",
      "compressed": "02f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9"
    },
    "wif": {
      "extended": "5HpHagT65TZzG1PH3CSu63k8DbpvD8s5ip4nEB3kEsreB1FQ8BZ",
      "compressed": "KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFU74sHUHy8S"
    },
    "address": {
      "extended": "1NZUP3JAc9JkmbvmoTv7nVgZGtyJjirKV1",
      "compressed": "1CUNEBjYrCn2y1SdiUMohaKUi4wpP326Lb"
    }
  }
]

```
