var http = require('http');
var URLParse = require('url-parse');
var port = 9615;

http.createServer(function (req, res) {
	// console.log ({req:req, res:res});
	// http://localhost:9615/?index=666&debug=true
	var parse = URLParse (req.url, true);
	console.log ({query:parse.query});
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end("url-parse:\n"+JSON.stringify (parse.query, null, 8)+"\n");
}).listen(port);
console.log ("Listening on: "+JSON.stringify ({port}));
