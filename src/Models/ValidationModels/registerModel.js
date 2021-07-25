import Joi from "joi";

export default Joi.object({
  username: Joi.string()
    .alphanum()
    .min(5)
    .max(50)
    .required(),

  password: Joi.string()
    .alphanum()
    .min(6)
    .max(50)
    .required(),

  repeat_password: Joi.ref('password'),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})
  .with('password', 'repeat_password');

