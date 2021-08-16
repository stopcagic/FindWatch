import Joi from "joi";

export default Joi.object({
  user_id: Joi.string()
    .alphanum()
    .required(),
  jw_id: Joi.string()
    .alphanum()
    .required(),
  content: Joi.string()
    .min(1)
    .max(255)
    .required()
})