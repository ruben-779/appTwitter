var fs = require("fs");
var users = require("../../data/users.json");

module.exports = {
  getAllUsers,
  getByUsername,
  createUser,
  editUser,
  editPatch,
  deleteUser,
  createUsernameTweet,
  deleteOneTweet
};

var { deleteOwnerTweets } = require("../tweets/tweets.controller");

function deleteOneTweet (id, owner){
  
  let user = users.find(u => u.username = owner)
  user.tweets = user.tweets.filter(u => u !=id)
  fs.writeFile("./data/users.json", JSON.stringify(users), (err) => {})
  

}

function createUsernameTweet(id, owner) {
  var user = users.find((u) => u.username == owner);
  if (user) {
    user.tweets.push(id);
    fs.writeFile("./data/users.json", JSON.stringify(users), (err) => {});
  }
}

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function getAllUsers(req, res) {
  res.json(users);
}

function getByUsername(req, res) {
  const username = req.params.username;
  var userId = users.find((u) => u.username == username);
  if (userId) {
    res.json(userId);
  } else {
    res.status(404).send("Usuario " + username + " no existe");
  }
}

function createUser(req, res) {
  const username = req.body.username;
  if (
    typeof username !== "undefined" &&
    typeof req.body.email !== "undefined" &&
    username.length > 2 &&
    validateEmail(req.body.email)
  ) {
    var userId = users.some((u) => u.username == username);
    if (userId) {
      res
        .status(418)
        .send("Usuario " + username + "  ya existe, prueba con otro nombre");
    } else {
      users.push({
        username: req.body.username,
        name: req.body.name ? req.body.name : "Soy una tetera",
        email: req.body.email,
        tweets: [],
      });
    }
  } else {
    res.status(400).send("Datos introducidos no validos");
  }
  fs.writeFile("./data/users.json", JSON.stringify(users), (err) => {});
  res.json(users);
}

function editUser(req, res) {
  const username = req.params.username;
  let indi = -1;
  if (validateEmail(req.body.email)) {
    users.forEach((u, indice) => {
      if (u.username == username) {
        (u.name = req.body.name ? req.body.name : "Soy una tetera"),
          (u.email = req.body.email),
          (indi = indice);
      }
    });
    res.json(users[indi]);
    fs.writeFile("./data/users.json", JSON.stringify(users), (err) => {});

    res.json(users);
  } else {
    res.status(400).send("Email no valido");
  }
}

function editPatch(req, res) {
  const username = req.params.username;
  let indi = -1;
  if (validateEmail(req.body.email) || typeof req.body.email === "undefined") {
    users.forEach((u, indice) => {
      if (u.username == username) {
        (u.name = req.body.name ? req.body.name : u.name),
          (u.email = req.body.email),
          (indi = indice);
      }
    });
    res.json(users[indi]);
    fs.writeFile("./data/users.json", JSON.stringify(users), (err) => {});

    res.json(users);
  } else {
    res.status(400).send("Email no valido");
  }
}

function deleteUser(req, res) {
  const username = req.params.username;
  users = users.filter((u) => u.username != username);
  deleteOwnerTweets(username);
  res.json(users);
  fs.writeFile("./data/users.json", JSON.stringify(users), (err) => {});

  //Eliminar tweet en ./data/tweets.json
}
