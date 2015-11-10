var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets } );
});

// say that a client GET requests the path /users/nimit
router.get( '/users/:name', function (req, res) {
	var name = req.params.name;
	var list = tweetBank.find( {name: name} );

  	res.render( "index", { title: 'Twitter.js - Posts by '+ name, tweets: list }, function(err, html) {
  		res.send(html);
  	} );
});

router.get( '/users/:name/tweets/:id', function (req, res) {
	var name = req.params.name;
	var id = req.params.id;
	var list = tweetBank.find( {name: name} );

  	res.render( "index", { title: 'Twitter.js - Posts by '+ name, tweets: list }, function(err, html) {
  		res.send(html);
  	} );
});

module.exports = router;