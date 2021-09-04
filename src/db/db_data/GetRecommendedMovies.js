import connect from "../../db/index";
import _ from "lodash"
import { ObjectId } from "mongodb"
import GetAllMovieUserData from "./GetAllMovieUserData";

export default async userId => {
  if (userId == null) return null

  try {
    const db = await connect()

    const cursor = await db.collection("user_similarity").find({ users: userId })

    const userData = await cursor.toArray()
    if (userData.length === 0) throw "User does not exist"

    const similarityData = _(userData)
      .orderBy('pcc', 'desc').take(5).value()

    if (similarityData.length == 0) throw "Something went wrong"

    const users = _(similarityData).map(similarity => {
      return {
        ..._.omit(similarity, 'users'),
        username: _.remove(similarity.users, user => user !== userId)[0],
      }
    }).value()

    const mainUser = await GetAllMovieUserData({ user_id: ObjectId(user.userId) })

    const mainUserMovies = _.map(mainUser, 'jw_id')

    await Promise.map(users, async user => {
      const cursor = await await GetAllMovieUserData()
      user.reviews = _(_.filter(await cursor.toArray(), review => _.includes(mainUserMovies, review.jw_id)))
        .orderBy('rating', 'desc').take(5).value()
    })

    let movieRecommendations = []

    _.forEach(users, user => {
      _.forEach(user.reviews, review => {
        movieRecommendations.push({
          movieId: review.jw_id,
          rating: review.rating * user.pcc,
          type: review.type
        })
      })
    })

    return _(movieRecommendations)
      .orderBy('rating', 'desc')
      .unionBy('movieId')
      .value()

  } catch (err) {
    throw err
  }
}