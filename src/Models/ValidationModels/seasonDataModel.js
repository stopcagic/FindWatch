import Joi from "joi";

export default Joi.object({
  user_id: Joi.string()
    .alphanum()
    .required(),
  movie_user_data_id: Joi.string()
    .alphanum()
    .required(),
  season_number: Joi.number()
    .positive()
    .required()
})