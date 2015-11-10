var express = require('express');
var app = express();
var swig  = require('swig');
var path = require('path');
var routes = require('./routes/');
var bodyParser = require('body-parser');

app.use('/', routes);

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views' );
swig.setDefaults({ cache: false });

app.use(function (req, res, next) {
	console.log(req.method, req.path, res.statusCode);
	next();
});

// Use request.path to get the route
// See if that route maps to a valid file in the public directory
// If not, go defer to the next matching middleware
// If the file matches, send over its contents

app.get('/stylesheets/:fileName', function (req, res, next) {
	res.sendFile(path.join(__dirname, 'public', req.path), next);
});

var server = app.listen(3000, function() {
	console.log('server listening');
});