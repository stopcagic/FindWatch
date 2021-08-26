import connect from "../index";

export default async data => {
  if (data == null || data.key == null || data.value == null) return null
  try {
    const db = await connect()

    let oldDoc = {}
    oldDoc[data.key] = { $exists: true }

    let query = {}
    query[data.key] = data.value

    const result = await db.collection("user_similarity").replaceOne(
      oldDoc, query, { upsert: true });

    if (result.modifiedCount == 1) {
      return result
    }

    if (result.insertedCount == 1) {
      return result
    }
    else {
      throw "Failed to update document"
    }
  } catch (err) {
    throw err
  }
}