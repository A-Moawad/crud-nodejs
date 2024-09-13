const express = require("express");
const router = express.Router({ mergeParams: true });
const Employee = require("../models/employeeSchema");

const userController = require("../controller/userController");

// Get Request
router.get("/user/add.html", userController.user_add_get);

// Post Request
router.post("/user/add.html", userController.user_post);

module.exports = router;
