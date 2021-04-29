var router = require("express").Router();

//import functions from users.controller
var userController = require("./users.controller");

// rouner Get
router.get("/", userController.getAllUsers);
router.get("/:username", userController.getByUsername);

//router post
router.post("/", userController.createUser);

//router put
router.put("/:username", userController.editUser);

//router patch
router.patch("/:username", userController.editPatch);

//router delete
router.delete("/:username", userController.deleteUser);

module.exports = router;
