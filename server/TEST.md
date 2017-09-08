# Directoryjs - Server - Test

## test-bitcoinjs-lib.js
```
node test/test-bitcoinjs-lib.js
bitcoinjs-lib 'testRandomAddress' ok
```

## test-http-server.js
```
node test/test-http-server.js
```

http://localhost:9615/?index=668&debug=true

```
curl "http://localhost:9615/?index=668&debug=true"
url-parse:
{
        "index": "668",
        "debug": "true"
}
```
