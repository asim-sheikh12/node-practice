const JWT = require("jsonwebtoken");

exports.verifyAcessToken = (req, res, next) => {
  if (!req.headers["authorization"])
    return res.status(401).send("Unauthorised Access");
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
  console.log(authHeader)
  JWT.verify(token, process.env.accessToken, (err, payload) => {
    if (err) {
      return res.json({
        success: false,
        message: "Failed to authenticate token.",
      });
    }
    req.payload = payload;
    console.log(payload);
    return next();
  });
};
