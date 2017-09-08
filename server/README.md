# Directoryjs - Server

Creating a `directory.io` website, only using server side nodejs (as `directory.io` do)

## Install nodejs

From [installing nodejs on Debian and Ubuntu](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)

```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

```
sudo apt-get install -y build-essential
```

##  Install XO

```
 sudo npm install --global xo
```

## Install dependencies

```
cd server
npm install
```

## Test

### test-bitcoinjs-lib.js
```
node test/test-bitcoinjs-lib.js
bitcoinjs-lib 'testRandomAddress' ok
```

### test-http-server.js
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
