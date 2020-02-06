var express = require("express");
var router = express.Router();
const userController = require("../controllers/users");
const Auth = require("../helpers/auth");

router
  .all("/*", Auth.authInfo)
  .post("/register", userController.register)
  .post("/login", userController.login)
  .delete("/:id_user", userController.deleteUser);

module.exports = router;
