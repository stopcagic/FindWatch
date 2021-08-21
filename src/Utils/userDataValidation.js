import movieUserDataModel from "../Models/ValidationModels/movieUserDataModel"
import seasonDataModel from "../Models/ValidationModels/seasonDataModel"
import episodeDataModel from "../Models/ValidationModels/episodeDataModel"
import commentDataModel from "../Models/ValidationModels/commentDataModel"
import commentLikesModel from "../Models/ValidationModels/commentLikesModel"

const movieUserDataValidation = data => {
  const schema = movieUserDataModel

  const { error } = schema.validate({
    user_id: data.userId,
    jw_id: data.jwId,
    genres: data.genres,
    type: data.type,
    release_date: data.release_date
  })
  if (error)
    return error.details[0].message;
}

const seasonDataValidation = data => {
  const schema = seasonDataModel

  const { error } = schema.validate({
    user_id: data.userId,
    movie_user_data_id: data.movieUserDataId,
    season_jw_id: data.seasonJwId,
    season_number: data.seasonNumber
  })
  if (error)
    return error.details[0].message;
}

const episodeDataValidation = data => {
  const schema = episodeDataModel

  const { error } = schema.validate({
    season_data_id: data.seasonDataId,
    episode_number: data.episodeNumber,
    season_jw_id: data.seasonJwId
  })
  if (error)
    return error.details[0].message;
}

const commentDataValidation = (data) => {
  const schema = commentDataModel

  const { error } = schema.validate({
    user_id: data.userId,
    jw_id: data.jwId,
    season_jw_id: data.seasonJwId,
    episode_number: data.episodeNumber,
    content: data.content
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