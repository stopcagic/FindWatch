import connect from "../../db/index";
import _ from "lodash"
import { ObjectId } from "mongodb"
import GetAllMovieUserData from "./GetAllMovieUserData";
import filter from "../../Utils/filterHelper"
import Utils from "../../Utils/callEndpointUtil"

export default async userId => {
  try {
    let data = []
    const requestBody = filter()
    let apiMovies = await Utils.justWatchAPIfetchData(`/en_US/popular`, requestBody)
    let apiMovieScores = [];

    apiMovies.items.forEach(x => {
      let apiMovie = {};
      apiMovie.id = x.id
      apiMovie.imdb_rating = x.scoring.find(y => y.provider_type === "imdb:score")?.value

      if (apiMovie.imdb_rating !== undefined) {
        apiMovieScores.push(apiMovie)
      }
    })

    if (userId == null) return apiMovies

    const db = await connect()

    const cursor = await db.collection("user_similarity").find({ users: userId })

    const userData = await cursor.toArray()

    if (userData.length === 0) return apiMovies

    const similarityData = _(userData)
      .orderBy('pcc', 'desc').filter(x => x.pcc > 0).take(5).value()

    if (similarityData.length == 0) return apiMovies;

    const users = _(similarityData).map(similarity => {
      return {
        ..._.omit(similarity, 'users'),
        userId: _.remove(similarity.users, user => user !== userId)[0],
      }
    }).value()

    const mainUser = await GetAllMovieUserData({ user_id: ObjectId(userId) })

    const mainUserMovies = _.map(mainUser, 'jw_id')
    const allMovieUserData = await GetAllMovieUserData()

    await Promise.all(
      users.map(user => {
        user.reviews = _(_.filter(allMovieUserData, review => user.userId == review.user_id && !_.includes(mainUserMovies, review.jw_id)))
          .orderBy('rating', 'desc').take(6).value()
      }))

    let movieRecommendations = []


    users.forEach(user => user.reviews.forEach(review => {
      let apiRating = apiMovieScores.find(x => x.id == review.jw_id)?.imdb_rating
      movieRecommendations.push({
        movieId: review.jw_id,
        rating: apiRating != undefined ? review.rating * user.pcc + apiRating : review.rating * user.pcc,
        type: review.type
      })
    }))

    let filteredMovies = _.uniqBy(movieRecommendations, "movieId")

    _(filteredMovies)
      .orderBy('rating', 'desc')
      .unionBy('movieId')
      .value()

    for (const x of filteredMovies) {
      data.push(await Utils.fetchJWInfo(x.type, x.movieId))
    }

    let unwatchedMovies = apiMovies.items.filter(x => !mainUserMovies.includes(x.id.toString()));

    if (data < 10) return unwatchedMovies

    return data;

  } catch (err) {
    throw err
  }
}