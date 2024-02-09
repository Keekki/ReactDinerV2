const express = require("express");
const { signUpUser, loginUser } = require("../controllers/userController");

const router = express.Router();

router.post("/users/signup", signUpUser);
router.post("/users/login", loginUser);

module.exports = router;
