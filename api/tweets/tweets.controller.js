var fs = require("fs");

var tweets = require("../../data/tweets.json");

var {
  createUsernameTweet,
  deleteOneTweet,
} = require("../users/users.controller");

module.exports = {
  createTweet,
  getAllTweets,
  getTweetById,
  deleteTweet,
  deleteOwnerTweets,
};

var uniqId = require("uniqid");

function deleteOwnerTweets(owner) {
  tweets = tweets.filter((u) => u.owner != owner);
  fs.writeFile("./data/tweets.json", JSON.stringify(tweets), (err) => {});
}

function getAllTweets(req, res) {
  res.json(tweets);
}

function getTweetById(req, res) {
  let id = req.params.id;
  let tweet = tweets.find((u) => u.id == id);
  if (typeof tweet === "undefined") {
    res.status(404).send("Tweet no existe");
  } else {
    res.json(tweet);
  }
}

function createTweet(req, res) {
  if (typeof req.body.text !== "undefined" && req.body.text.length > 10) {
    var idnew = uniqId();
    tweets.push({
      id: idnew,
      text: req.body.text,
      owner: req.body.owner,
      createdAt: Date.now(),
    });
    createUsernameTweet(idnew, req.body.owner);
    res.json(tweets);
    fs.writeFile("./data/tweets.json", JSON.stringify(tweets), (err) => {});
  } else {
    res.status(404).send("Ohhhh ha ocurrido un error!!");
  }
}

function deleteTweet(req, res) {
  let id = req.params.id;
  let tweet = tweets.find((u) => u.id == id);
  if (typeof tweet !== "undefined") {
    console.log(tweet);
    deleteOneTweet(id, tweet.owner);
    tweets = tweets.filter((u) => u.id != id);
    res.json(tweets);
    fs.writeFile("./data/tweets.json", JSON.stringify(tweets), (err) => {});
  } else {
    res.status(404).send("ohhhh noo!! Tweet no encontrado");
  }
}
