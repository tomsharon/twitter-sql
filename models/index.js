// pull in the Sequelize library
var Sequelize = require('sequelize');
// create an instance of a database connection
// which abstractly represents our app's mysql database
var twitterjsDB = new Sequelize('twitterjs', 'root', null, {
    dialect: "mysql",
    port:    3306,
});

// open the connection to our database
twitterjsDB
  .authenticate()
  .catch(function(err) {
    console.log('Unable to connect to the database:', err);
  })
  .then(function() {
    console.log('Connection has been established successfully.');
  });

var Tweet = require('./tweet')(twitterjsDB);
var User = require('./user')(twitterjsDB);

// adds a UserId foreign key to the `Tweet` table

//Any given user ID can have many tweets
User.hasMany(Tweet);
//Each tweet can only belong to one user. 
Tweet.belongsTo(User);

module.exports = {
    User: User,
    Tweet: Tweet
};

// User.findOne().then(function (user) {
//   console.log('hi', user);
//     return user.getTweets();
// })
// .then(function (tweets) {
//   console.log(tweets);
//     JSON.stringify(tweets); // another way of just logging the plain old values
// });
