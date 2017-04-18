require('dotenv').load();
var express = require('express');
var path = require('path');
var app = express();
var Twitter = require('twitter');
var _ = require('lodash');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type');
  next();
});

app.options('*', function(res, req) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type');
});

var T = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})


//fetches tweets containing specific hashtag
var fetchHashtag = function (req, res) {
  T.get('search/tweets', {q:'%23TravelTuesday', count:5}, function(error,data,response) {
    console.log(data);
  })
};
fetchHashtag();

//fetches tweets by user name
/*var fetchTwitterData = function(req, res) {
  var twitterHandle = 'academicpilot';
  T.get('statuses/user_timeline', {
      screen_name: twitterHandle,
      count: 10
    },
    function(error, data, response) {
      console.log(data);
    }
  );
};

fetchTwitterData();*/

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 4000);

var server = app.listen(app.get('port'), function() {
  console.log('%c express server 🏀 listening on port ' + server.address().port);
});
