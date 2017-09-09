# Directoryjs

Learning `Bitcoin` programming with `JavaScript `and `nodejs` creating an inspired by http://directory.io project.

* [Server](server/README.md)
* [Client](client/README.md)

# Examples

## Dumping last 3 Bitcoin addresses

```c
echo '{"offset":"115792089237316195423570985008687907852837564279074904382605163141518161494333", "delta": 3}' | node server/cmd-dump-keys.js | jq
[
  {
    "index": "115792089237316195423570985008687907852837564279074904382605163141518161494333",
    "wif": {
      "extended": "5Km2kuu7vtFDPpxywn4u3NLpbr5jKpTB3jsuDU2KYEqetVTGEAr",
      "compressed": "L5oLkpV3aqBjhki6LmvChTCV6odsp4SXM6FfU2Gppt5kDqyBgPYj"
    },
    "address": {
      "extended": "1F3zbGb5JLBnmCAAYjCCv35zkggrXfi8LR",
      "compressed": "1FjMR9gvnmZ3JYMxBbyc3aZK717b5txJoC"
    }
  },
  {
    "index": "115792089237316195423570985008687907852837564279074904382605163141518161494334",
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
    "index": "115792089237316195423570985008687907852837564279074904382605163141518161494335",
    "wif": {
      "extended": "5Km2kuu7vtFDPpxywn4u3NLpbr5jKpTB3jsuDU2KYEqetd9ZKJ4",
      "compressed": "L5oLkpV3aqBjhki6LmvChTCV6odsp4SXM6FfU2Gppt5kEqeonMfk"
    },
    "address": {
      "extended": "1Knh2eFMtzMEtmvGHW14ELG8F9Ny6jV4s3",
      "compressed": "1NjSB7UL4MtdjmPbTUfaHne9R5C2YGxUSA"
    }
  }
]
```
