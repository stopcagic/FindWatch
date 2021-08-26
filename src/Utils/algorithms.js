import _ from "lodash"

const euclideanDistance = (user1, user2) => {
  const n = _.size(user1)
  let coefficient = 0

  if (n === 0) {
    return n
  }

  for (let i = 0; i < n; i++) {
    coefficient += Math.pow(user1[i].rating - user2[i].rating, 2)
  }

  return 1 / (1 + Math.sqrt(coefficient))
}

const squaredNum = (user) => Math.pow(user.rating, 2)


const manhattanDistance = (user1, user2) => {
  const n = _.size(user1)
  let coefficient = 0

  if (n === 0) {
    return n
  }

  for (let i = 0; i < n; i++) {
    coefficient += Math.abs(user1[i].rating - user2[i].rating)
  }

  return 1 / (1 + coefficient)
}

// Pearson correlation coefficient
const pcc = (user1, user2) => {
  const n = _.size(user1)

  if (n === 0) {
    return n
  }

  const user1MovieScoreSum = _.sumBy(user1, 'rating')
  const user2MovieScoreSum = _.sumBy(user2, 'rating')
  const user1MovieScoreSqSum = _.sumBy(user1, squaredNum)
  const user2MovieScoreSqSum = _.sumBy(user2, squaredNum)

  let pSum = 0

  for (let i = 0; i < n; i++) {
    pSum += (user1[i].rating * user2[i].rating)
  }

  const num = pSum - ((user1MovieScoreSum * user2MovieScoreSum) / n)

  const den = Math.sqrt(
    (user1MovieScoreSqSum - (Math.pow(user1MovieScoreSum, 2) / n)) *
    (user2MovieScoreSqSum - (Math.pow(user2MovieScoreSum, 2) / n))
  )

  if (den === 0) {
    return 0
  }

  return num / den
}

export {
  euclideanDistance,
  manhattanDistance,
  pcc,
}
