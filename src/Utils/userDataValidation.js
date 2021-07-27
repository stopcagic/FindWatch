import movieUserDataModel from "../Models/ValidationModels/movieUserDataModel"
import seasonDataModel from "../Models/ValidationModels/seasonDataModel"
import episodeDataModel from "../Models/ValidationModels/episodeDataModel"
import commentDataModel from "../Models/ValidationModels/commentDataModel"
import commentLikesModel from "../Models/ValidationModels/commentLikesModel"

const movieUserDataValidation = data => {
  const schema = movieUserDataModel

  const { error } = schema.validate({
    user_id: data.userId,
    imdb_id: data.imdbId
  })
  if (error)
    return error.details[0].message;
}

const seasonDataValidation = data => {
  const schema = seasonDataModel

  const { error } = schema.validate({
    user_id: data.userId,
    movie_user_data_id: data.movieUserDataId,
    season_number: data.seasonNumber
  })
  if (error)
    return error.details[0].message;
}

const episodeDataValidation = data => {
  const schema = episodeDataModel

  const { error } = schema.validate({
    season_data_id: data.seasonDataId,
    episode_number: data.episodeNumber
  })
  if (error)
    return error.details[0].message;
}

const commentDataValidation = (data, date) => {
  const schema = commentDataModel

  const { error } = schema.validate({
    user_id: data.userId,
    imdb_id: data.imdbId,
    content: data.content,
    date_time: date
  })
  if (error)
    return error.details[0].message;
}

const commentLikesDataValidation = (data) => {
  const schema = commentLikesModel

  const { error } = schema.validate({
    user_id: data.userId,
    comment_id: data.commentId,
  })
  if (error)
    return error.details[0].message;
}

export {
  movieUserDataValidation, seasonDataValidation,
  episodeDataValidation, commentDataValidation,
  commentLikesDataValidation
}