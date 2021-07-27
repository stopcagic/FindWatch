import Joi from "joi";

export default Joi.object({
  user_id: Joi.object()
    .required(),
  comment_id: Joi.object()
    .required(),

})