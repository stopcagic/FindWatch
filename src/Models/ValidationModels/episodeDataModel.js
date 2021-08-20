import Joi from "joi";

export default Joi.object({
  season_data_id: Joi.string()
    .alphanum()
    .required(),
  episode_number: Joi.number()
    .positive()
    .required(),
  season_jw_id: Joi.number()
    .positive()
    .required(),
})