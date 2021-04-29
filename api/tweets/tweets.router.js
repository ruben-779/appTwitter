const { route } = require("../users/users.router");
const tweetsController = require("./tweets.controller");
var router = require("express").Router();

router.get("/", tweetsController.getAllTweets);

router.get("/:id", tweetsController.getTweetById);

router.post("/", tweetsController.createTweet);

router.delete("/:id", tweetsController.deleteTweet);

module.exports = router;
