var express = require('express');
const userController = require("../controllers/userControllers");
const itemController = require("../controllers/itemControllers");

var router = express.Router();

router.get("/", userController.allUsers, itemController.allItems, res.render('backOffice', {users: res.users, items: res.items}));

router.post('/')