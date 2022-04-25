const jwt = require("jsonwebtoken");
exports.generateToken = (id) => {
  try {
    const token = jwt.sign({ id }, process.env.accessToken);
    console.log(id);
    return {token};
  } catch (error) {
    console.log(error);
  }
};
