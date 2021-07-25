import userDataSchema from "../Models/ValidationModels/userDataModel"

const userDataValidation = data => {
  const schema = userDataSchema

  const { error } = schema.validate({
    user_id: data.userId,
    imdb_id: data.imdbId
  })
  if (error)
    return error.details[0].message;
}

export { userDataValidation }