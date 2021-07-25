import registrationSchema from "../Models/ValidationModels/registerModel"
import loginSchema from "../Models/ValidationModels/loginModel"

const registrationValidation = data => {
  const schema = registrationSchema

  const { error } = schema.validate({
    username: data.username,
    password: data.password,
    repeat_password: data.repeat_password,
    email: data.email
  })
  if (error)
    return error.details[0].message;
}

const loginValidation = data => {
  const schema = loginSchema

  const { error } = schema.validate({
    username: data.username,
    password: data.password,
    email: data.email
  })
  if (error)
    return error.details[0].message;
}

export { registrationValidation, loginValidation }