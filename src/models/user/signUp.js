const bcrypt = require("bcryptjs/dist/bcrypt");
const mongoose = require("mongoose");
const validator = require("validator");

const signUpSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    validate(values) {
      if (!validator.isEmail(values)) {
        throw new Error("Invalid Email");
      }
    },
  },
  mobile: {
    type: Number,
    min: 10,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

signUpSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});
const SignUp = new mongoose.model("SignUp", signUpSchema);

module.exports = SignUp;
