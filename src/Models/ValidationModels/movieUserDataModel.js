import Joi from "joi";

export default Joi.object({
  user_id: Joi.string()
    .alphanum()
    .required(),
  imdb_id: Joi.string()
    .alphanum()
    .required()
})