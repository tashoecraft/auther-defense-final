//'use strict';

var app = require('./app'),
	db = require('./db');

var https = require('https');
var fs = require('fs');

// var options = {
// 	key: fs.readFileSync(
// 		'/Users/Austin/Development/Fullstack/week6/auther-defense/key.pem'),
// 	cert: fs.readFileSync(
// 		'/Users/Austin/Development/Fullstack/week6/auther-defense/cert.pem')
// };
//
// var server = https.createServer(options, app);
//
// server.listen(8080, function() {
// 	console.log('here');
// });
//

var port = 8080;
var server = app.listen(port, function() {
	console.log('HTTP server patiently listening on port', port);
});

module.exports = server;
