var express = require('express');
var app = express();

app.use(function (req, res, next) {
	console.log(req.method, req.path, res.statusCode);
	next();
});

app.get('/', function (req, res) {
	res.status(200);
	res.send('This is the home page');
});

var server = app.listen(3000, function() {
	console.log('server listening');
});