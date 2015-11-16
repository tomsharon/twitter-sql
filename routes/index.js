var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');
var User = require('../models').User;
var Tweet = require('../models').Tweet;


router.get('/', function (req, res) {
  // var tweets = tweetBank.list();
  //SELECT * FROM TWEETS
  Tweet.findAll({ include: [ User ] }).then(function(arrayOfTweetsWeQueried){
  	// console.log(JSON.stringify(tweet));
  	// for (var i = 0; i < tweet.length; i++) {
	  // 	allTweets.push(tweet[i].dataValues);
  	// }
  	res.render( 'index', { title: 'Twitter.js', tweets: arrayOfTweetsWeQueried } );
  });
});

// function getTweet (req, res){
//   // var tweets = tweetBank.find(req.params);
//   res.render('index', { tweets: tweets });
// }

function getAllTweetsForOneUser(req, res) {
	var personName = req.params.name;
	User.findOne({ name: personName, include: [ Tweet ] })
		.then(function(arrayOfTweetsWeQueried){
			console.log("THIS IS IT!!!!!!", arrayOfTweetsWeQueried.dataValues.Tweets)
			//console.log(arrayOfTweetsWeQueried[0].dataValues.Tweets);
			res.render( 'index', { title: 'Twitter.js', tweets: arrayOfTweetsWeQueried.dataValues.Tweets } );
  		});
}

function getOneTweet(req, res){
	var tweetId = req.params.id
	Tweet.findOne({ id: tweetId, include: [ User ]})
		.then(function(arrayOfTweetsWeQueried) {
			console.log(arrayOfTweetsWeQueried)
			res.render( 'index', { title: 'Twitter.js', tweets: [arrayOfTweetsWeQueried.dataValues] } );
		})

}

router.get('/users/:name', getAllTweetsForOneUser);
router.get('/users/:name/tweets/:id', getOneTweet);

// note: this is not very REST-ful. We will talk about REST in the future.
router.post('/submit', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});

module.exports = router;