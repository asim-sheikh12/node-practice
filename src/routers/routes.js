const express = require("express");
const router = new express.Router();
const SignUp = require("../models/user/signUp");
const bcrypt = require("bcryptjs/dist/bcrypt");
const { verifyAcessToken } = require("../middleware/auth");
const { generateToken } = require("../middleware/generateToken");
const { signUpValidations } = require("../validations/signUpvalidations");
const { loginValidations } = require("../validations/loginValidations");
const { verifyEmail } = require("../models/Email/emailModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
router.get("/userlist", verifyAcessToken, async (req, res) => {
  try {
    const signUpData = await SignUp.find();
    res.status(200).send(signUpData);
  } catch (e) {
    return res.status(400).send(e);
  }
});
router.post("/signup", signUpValidations, async (req, res) => {
  try {
    const { fullName, email, mobile, password, confirmPassword, token } =
      req.body;
    // const result = await signUpSchema.validateAsync(req.body)
    const userData = new SignUp(req.body);
    if (password !== confirmPassword) {
      res.status(400).send("Password does not match");
    }
    const createdUser = await userData.save();
    req.user = createdUser;
    await verifyEmail(req);
    return res.status(200).send(createdUser);
  } catch (e) {
    return res.status(400).send(e);
  }
});
router.post("/login", loginValidations, async (req, res) => {
  try {
    const { email, password, token } = req.body;
    const userData = await SignUp.findOne({ email });
    const isMatch = await bcrypt.compare(password, userData.password);
    const loginToken = await generateToken(userData.id);
    const logggenInUser = await req.body;
    if (isMatch) {
      const target = logggenInUser;
      const source = loginToken;
      const result = Object.assign(target, source);
      return res.status(200).json(result);
    } else {
      return res.status(400).send("Either Email/Password does not match");
    }
  } catch (error) {
    return res.status(400).send("Either Email/Password does not match");
  }
});
router.get("/verify/:token", async (req, res) => {
  const { token } = req.params;
  jwt.verify(token, process.env.accessToken, (err, payload) => {
    if (err) {
      return res.json({
        success: false,
        message: "Failed to authenticate token.",
      });
    }
    req.payload = payload;
    console.log("Payload",payload);
    res.send("Email verified Successfully")
  });
});
module.exports = router;
