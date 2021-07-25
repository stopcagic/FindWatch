import UserSchema from "../Models/Schemas/userSchema"
import MovieUserSchema from "../Models/Schemas/movieUserSchema"
import SeasonDataSchema from "../Models/Schemas/seasonData"
import EpisodeDataSchema from "../Models/Schemas/episodeDataSchema"
import CommentSchema from "../Models/Schemas/commentSchema"
import CommentLikesSchema from "../Models/Schemas/commentLikes"



export default {

  CreateNewUserSchema: (req, hashPassword) => {
    return new UserSchema({
      username: req.body.username,
      password: hashPassword,
      email: req.body.email
    })
  },
  MovieUserSchema: (data, isPost) => {
    if (isPost)
      return new MovieUserSchema({
        imdb_id: data.imdb_id,
        user_id: data.user_id
      })
    if (!isPost)
      return new MovieUserSchema({
        imdb_id: data.imdb_id,
        like: data.like,
        dislike: data.dislike,
        rating: data.rating,
        favorite: data.favorite,
        completed: data.completed,
        watch_later: data.watch_later,
        user_id: data.user_id
      })
  },
  SeasonDataSchema: (data) => {
    return new SeasonDataSchema({
      movie_user_data_id: data.movie_user_data_id,
      user_id: data.user_id,
      season_number: data.season_number,
      is_completed: data.is_completed
    })
  },
  EpisodeDataSchema: (data) => {
    return new EpisodeDataSchema({
      season_data_id: data.season_data_id,
      episode_number: data.episode_number,
      watched: data.watched
    })
  },
  CommentSchema: (data) => {
    return new CommentSchema({
      user_id: data.user_id,
      imdb_id: data.imdb_id,
      content: data.content,
      date_time: data.date_time,
      edited: data.edited,
      edited_date_time: data.edited_date_time,
      isDeleted: data.isDeleted
    })
  },
  CommentLikesSchema: (data) => {
    return new CommentLikesSchema({
      comment_id: data.comment_id,
      user_id: data.user_id,
      like: data.like,
      dislike: data.dislike
    })
  }
}