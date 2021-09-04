import connect from "../index";

export default async data => {
  if (data == null || data.key == null || data.value == null) return null
  try {
    const db = await connect()

    const filter = { ids: data.key }

    const query = {
      ids: data.key,
      euc_dis: data.value.euclideanDistance,
      man_dis: data.value.manhattanDistance,
      pcc: data.value.pcc,
      users: data.value.users
    }

    const result = await db.collection("user_similarity").replaceOne(
      filter, query, { upsert: true });

    if (result.modifiedCount == 1) {
      return result
    }

    if (result.upsertedCount == 1) {
      return result
    }
    else {
      throw "Failed to update document"
    }
  } catch (err) {
    throw err
  }
}