const express = require("express");
const route = express.Router();
const { UserController } = require("../controllers");
const controller=new UserController();
route.post("/login", controller.login);
route.post("/signup", controller.signup);

module.exports = route;
