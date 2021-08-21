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
  MovieUserSchema: (oldDoc, data = null, isPost = false) => {
    if (isPost == true)
      return new MovieUserSchema({
        jw_id: data.jwId,
        user_id: data.userId,
        release_year: data.releaseYear,
        genres: data.genres,
        type: data.type,
        user_id: data.userId,
        release_year: data.release_date
      })
    if (isPost == false) {
      return new MovieUserSchema({
        jw_id: oldDoc.jw_id,
        like: data?.like != null ? data.like : oldDoc.like,
        dislike: data?.dislike != null ? data.dislike : oldDoc.dislike,
        rating: data?.rating != null ? data.rating : oldDoc.rating,
        favorite: data?.favorite != null ? data.favorite : oldDoc.favorite,
        completed: data?.completed != null ? data.completed : oldDoc.completed,
        watch_later: data?.watch_later != null ? data.watch_later : oldDoc.watch_later,
        release_year: oldDoc.release_year,
        genres: data != null ? null : oldDoc.genres,
        type: oldDoc.type,
        user_id: oldDoc.user_id
      })
    }

  },

  SeasonDataSchema: (oldDoc, data = null, isPost = false) => {
    if (oldDoc == null && data == null) return {}
    if (isPost == true)
      return new SeasonDataSchema({
        movie_user_data_id: data.movieUserDataId,
        user_id: data.userId,
        season_number: data.seasonNumber,
        season_jw_id: data.seasonJwId
      })
    if (isPost == false)
      return new SeasonDataSchema({
        movie_user_data_id: oldDoc.movie_user_data_id,
        user_id: oldDoc.user_id,
        season_number: oldDoc.season_number,
        is_completed: data?.is_completed != null ? data.is_completed : oldDoc.is_completed,
        season_jw_id: oldDoc.season_jw_id
      })

  },

  EpisodeDataSchema: (oldDoc, data = null, isPost = false) => {
    if (oldDoc == null && data == null) return {}
    if (isPost == true)
      return new EpisodeDataSchema({
        season_data_id: data.seasonDataId,
        episode_number: data.episodeNumber,
        season_jw_id: data.seasonJwId
      })
    if (isPost == false)
      return new EpisodeDataSchema({
        season_data_id: oldDoc.season_data_id,
        season_jw_id: oldDoc.season_jw_id,
        episode_number: oldDoc.episode_number,
        watched: data?.watched != null ? data.watched : oldDoc.watched
      })
  },

  CommentSchema: (oldDoc, data = null, isPost = false) => {
    if (oldDoc == null && data == null) return {}
    if (isPost == true)
      return new CommentSchema({
        user_id: data.userId,
        jw_id: data.jwId,
        season_jw_id: data?.seasonJwId,
        episode_number: data?.episodeNumber,
        content: data.content,
        date_time: new Date()
      })

    if (isPost == false) {
      return new CommentSchema({
        user_id: oldDoc.user_id,
        jw_id: oldDoc.jw_id,
        season_jw_id: oldDoc.season_jw_id,
        episode_number: oldDoc.episode_number,
        content: data?.content != null ? data.content : oldDoc.content,
        date_time: oldDoc.date_time,
        edited: data != null ? true : oldDoc.edited,
        edited_date_time: data != null ? new Date() : oldDoc.edited_date_time,
        isDeleted: data?.isDeleted != null ? data.isDeleted : oldDoc.isDeleted,
        reactions: data != null ? null : oldDoc.reactions
      })
    }
  },

  CommentLikesSchema: (oldDoc, data = null, isPost = false) => {
    if (oldDoc == null && data == null) return {}
    if (isPost == true)
      return new CommentLikesSchema({
        comment_id: data.commentId,
        user_id: data.userId
      })
    if (isPost == false)
      return new CommentLikesSchema({
        comment_id: oldDoc.comment_id,
        user_id: oldDoc.user_id,
        like: data?.like != null ? data.like : oldDoc.like,
        dislike: data?.dislike != null ? data.dislike : oldDoc.dislike
      })
  }
}