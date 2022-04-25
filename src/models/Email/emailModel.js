const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const SignUp = require("../user/signUp");
exports.verifyEmail = async (req) => {
  const secureEmail = process.env.secureEmail;
  const securePassword = process.env.securePassword;
  const email = req.body.email;
  const token = jwt.sign({id:req.user.id}, process.env.accessToken);
  const result = await SignUp.findOne({ email });
  console.log("Token>>>>",token);
   async function main() {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: secureEmail,
        pass: securePassword,
      },
    });
    let info = await transporter.sendMail({
      from: `Asim Sheikh <${email}?`,
      to: req.body.email,
      subject: "Email Verification",
      text: `http://localhost:8000/verify/${token}`,
      html: `Please visit this http://localhost:8000/verify/${token} to verify your email`,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  };

  main().catch(console.error);
};
