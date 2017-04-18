require('dotenv').load();
var express=require('express');
var app=express();
var path=require('path');
var Twit=require('twit');
var _=require('lodash');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials',true);
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.options('*', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials',true);
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
});

var T= new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});


// //---fetches tweets by username
// var fetchTwitterData= function(req, res) {
//   var twitterHandle = "academicpilot";
//   T.get('statuses/user_timeline', {screen_name: twitterHandle, count:2},
//     function(error, data, response) {
//       console.log(data);
//     }
//   );
// };
//
// fetchTwitterData();

// //---fetches tweets containing specified hashtag
// var fetchHashtag= function (req, res) {
//   T.get('search/tweets', {q:'%23montanamoment', count:5},
//     function(error, data, response) {
//     console.log(data);
//     }
//   );
// };

// fetchHashtag();

//---streams tweets containing a word or hashtag
var stream = T.stream('statuses/filter', {track:'montana'})
    stream.on('tweet', function (tweet){
      console.log(tweet);
    })

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 4000);

var server= app.listen(app.get('port'), function(){
  console.log("express server listening : on port" + server.address().port);
});
