import _ from "lodash"
import { ObjectId } from "mongodb"

import { euclideanDistance, pcc, manhattanDistance } from "./algorithms"
import GetAllMovieUserData from "../db/db_data/GetAllMovieUserData"
import UpdateUserCoefficients from "../db/db_data/UpdateUserCoefficients"
import GetUsers from "../db/GetUsers"

const getUserMovieReviews = async (userId) => await GetAllMovieUserData({ user_id: ObjectId(userId) })

const getUserMutualMovieReviews = async (user, mainUserMovies) => {
  const allReviews = await getUserMovieReviews(user._id)

  return _.filter(allReviews, review => _.includes(mainUserMovies, review.jw_id))
}



const filterUserMutualMovies = (user1, user2, mutateObjects = false) => {
  let mutualMovies = _.intersection(
    _.map(user1, 'jw_id'),
    _.map(user2, 'jw_id')
  )

  function filterHelper(user) {
    return _.includes(mutualMovies, user.jw_id)
  }

  let tempUser1, tempUser2

  if (mutateObjects) {
    tempUser1 = user1
    tempUser2 = user2
  } else {
    tempUser1 = _.cloneDeep(user1)
    tempUser2 = _.cloneDeep(user2)
  }

  tempUser1 = _(tempUser1)
    .filter(filterHelper)
    .orderBy('jw_id')
    .value()
  tempUser2 = _(tempUser2)
    .filter(filterHelper)
    .orderBy('jw_id')
    .value()

  return [tempUser1, tempUser2]
}

const updateUserSimilarityScores = async (userId) => {
  const users = await GetUsers()

  const mainUser = await getUserMovieReviews(userId)

  const mainUserMovies = _.map(mainUser, 'jw_id')

  return Promise.all(
    users.map(async user => {
      if (user._id.toString() == userId.toString()) {
        return
      }

      user.movies = await getUserMutualMovieReviews(user, mainUserMovies)

      const clonedUsers = filterUserMutualMovies(mainUser, user.movies)

      return await UpdateUserCoefficients({
        key: [user._id.toString(), userId].sort().join('-'),
        value: {
          euclideanDistance: euclideanDistance(clonedUsers[0], clonedUsers[1]),
          manhattanDistance: manhattanDistance(clonedUsers[0], clonedUsers[1]),
          pcc: pcc(clonedUsers[0], clonedUsers[1]),
          users: [user._id.toString(), userId].sort(),
        }
      })
    }))
}


export {
  filterUserMutualMovies,
  getUserMovieReviews,
  updateUserSimilarityScores
}
