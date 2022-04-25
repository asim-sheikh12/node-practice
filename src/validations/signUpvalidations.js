const Joi = require("joi");

exports.signUpValidations = (req, res, next) => {
  const validateUser = (data) => {
   const  JoiSchema = Joi.object({
      fullName: Joi.string().required(),
      email: Joi.string().email().lowercase().required(),
      mobile: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
      password: Joi.string().min(8).required(),
      confirmPassword: Joi.string().min(8).required(),
      token: Joi.string(),
    });

    return JoiSchema.validate(data);
  };
  const response = validateUser(req.body);
   if (response.error) {
    let error = response.error.details[0].message;
    console.log(response.error)
    let msg = error.replace(/[^a-zA-Z 0-9]/g,"");
    // const data = msg.replaceAll('[\\-\\+\\.\\^:,]', '');
    return res
      .status(422)
      .json({ statusCode: 422, message: msg})
} else {
    next();
  }
};
