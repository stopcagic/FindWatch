import connect from "../db/index";

export default async () => {
  try {
    let db = await connect();

    const cursor = await db.collection("users").find()
    const response = await cursor.toArray()
    if (response.length == 0) return {};

    return response

  } catch (error) {
    console.log(error);
    throw "Something went wrong"
  }
}
