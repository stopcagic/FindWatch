import User from "../Models/Schemas/userSchema"
import MovieUserSchema from "../Models/Schemas/movieUserSchema"
import SeasonData from "../Models/Schemas/seasonData"
import EpisodeDataSchema from "../Models/Schemas/episodeDataSchema"
import CommentSchema from "../Models/Schemas/commentSchema"
import CommentLikesSchema from "../Models/Schemas/commentLikes"



export default {

  CreateNewUserSchema: (req, hashPassword) => {
    return new User({
      username: req.body.username,
      password: hashPassword,
      email: req.body.email
    })
  },
  MovieUserSchema: (data) => {
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
  }
}