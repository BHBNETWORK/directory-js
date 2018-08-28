# Directory-js

Learning `Bitcoin` programming with `JavaScript `and `nodejs` creating an inspired by http://directory.io project.

* [Server](server/README.md)
* [Client](client/README.md)

# Examples

## Dumping last 3 Bitcoin addresses

```c
$ echo '{"offset":{"index":"115792089237316195423570985008687907852837564279074904382605163141518161494334", "base":10}, "delta": 3, "network":"livenet"}' | node server/cmd-dump-keys.js | jq
[
  {
    "index": {
      "dec": "115792089237316195423570985008687907852837564279074904382605163141518161494334",
      "hex": "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036413e"
    },
    "key": {
      "extended": "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036413e",
      "compressed": "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036413e"
    },
    "public_key": {
      "extended": "04f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9c77084f09cd217ebf01cc819d5c80ca99aff5666cb3ddce4934602897b4715bd",
      "compressed": "03f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9"
    },
    "wif": {
      "extended": "5Km2kuu7vtFDPpxywn4u3NLpbr5jKpTB3jsuDU2KYEqetbh69Dr",
      "compressed": "L5oLkpV3aqBjhki6LmvChTCV6odsp4SXM6FfU2Gppt5kELprCx3Q"
    },
    "address": {
      "extended": "15K4QVHD5T1KvW4it56qNuGJoTGMpUaFMj",
      "compressed": "1HjFHBmhUQkKntPPeWmiLiNGewRAMQWNYs"
    }
  },
  {
    "index": {
      "dec": "115792089237316195423570985008687907852837564279074904382605163141518161494335",
      "hex": "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036413f"
    },
    "key": {
      "extended": "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036413f",
      "compressed": "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036413f"
    },
    "public_key": {
      "extended": "04c6047f9441ed7d6d3045406e95c07cd85c778e4b8cef3ca7abac09b95c709ee5e51e970159c23cc65c3a7be6b99315110809cd9acd992f1edc9bce55af301705",
      "compressed": "03c6047f9441ed7d6d3045406e95c07cd85c778e4b8cef3ca7abac09b95c709ee5"
    },
    "wif": {
      "extended": "5Km2kuu7vtFDPpxywn4u3NLpbr5jKpTB3jsuDU2KYEqetd9ZKJ4",
      "compressed": "L5oLkpV3aqBjhki6LmvChTCV6odsp4SXM6FfU2Gppt5kEqeonMfk"
    },
    "address": {
      "extended": "1Knh2eFMtzMEtmvGHW14ELG8F9Ny6jV4s3",
      "compressed": "1NjSB7UL4MtdjmPbTUfaHne9R5C2YGxUSA"
    }
  },
  {
    "index": {
      "dec": "115792089237316195423570985008687907852837564279074904382605163141518161494336",
      "hex": "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364140"
    },
    "key": {
      "extended": "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364140",
      "compressed": "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364140"
    },
    "public_key": {
      "extended": "0479be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798b7c52588d95c3b9aa25b0403f1eef75702e84bb7597aabe663b82f6f04ef2777",
      "compressed": "0379be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"
    },
    "wif": {
      "extended": "5Km2kuu7vtFDPpxywn4u3NLpbr5jKpTB3jsuDU2KYEqetqj84qw",
      "compressed": "L5oLkpV3aqBjhki6LmvChTCV6odsp4SXM6FfU2Gppt5kFLaHLuZ9"
    },
    "address": {
      "extended": "1JPbzbsAx1HyaDQoLMapWGoqf9pD5uha5m",
      "compressed": "1GrLCmVQXoyJXaPJQdqssNqwxvha1eUo2E"
    }
  }
]

```
