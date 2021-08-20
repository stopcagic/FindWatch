import Joi from "joi";

export default Joi.object({
  user_id: Joi.string()
    .alphanum()
    .required(),
  jw_id: Joi.string()
    .alphanum()
    .required(),
  season_jw_id: Joi.number(),
  episode_number: Joi.number(),
  content: Joi.string()
    .min(1)
    .max(255)
    .required()
})