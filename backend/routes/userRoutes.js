const express = require("express");
const verifyToken = require("../middleware/verifyToken.js");
const {
  signUpUser,
  loginUser,
  getUserDetails,
} = require("../controllers/userController");

const router = express.Router();

router.post("/users/signup", signUpUser);
router.post("/users/login", loginUser);
router.get("/users/details/:userId", verifyToken, getUserDetails);

module.exports = router;
