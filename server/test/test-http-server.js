const http = require('http');
const urlParse = require('url-parse');

const port = 9615;

http.createServer((req, res) => {
	// Console.log ({req:req, res:res});
	// http://localhost:9615/?index=666&debug=true
	const parse = urlParse(req.url, true);
	console.log({query: parse.query});
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('url-parse:\n' + JSON.stringify(parse.query, null, 8) + '\n');
}).listen(port);
console.log('Listening on: ' + JSON.stringify({port}));
