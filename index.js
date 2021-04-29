var express = require("express");
var app = express();
app.use(express.json());

//router
var routerUser = require("./api/users/users.router.js");
var routerTweets = require("./api/tweets/tweets.router.js");
app.use("/users", routerUser);
app.use("/tweets", routerTweets);



app.listen(4000);
