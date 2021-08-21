import Joi from "joi";

export default Joi.object({
  user_id: Joi.string()
    .alphanum()
    .required(),
  jw_id: Joi.string()
    .alphanum()
    .required(),
  genres: Joi.array()
    .required(),
  type: Joi.string()
    .alphanum()
    .required(),
  rating: Joi.number()
    .min(1)
    .max(10),
  release_date: Joi.number()
})