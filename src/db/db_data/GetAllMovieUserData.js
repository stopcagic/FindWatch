import connect from "../index";

export default async query => {
  try {

    let db = await connect();
    let cursor = null

    if (query != null)
      cursor = await db.collection("movie_user_data").find(query)
    else
      cursor = await db.collection("movie_user_data").find()

    const response = await cursor.toArray()

    if (response.length == 0) return null;

    return response;

  } catch (error) {
    console.log(error);
    throw "Something went wrong"
  }
}
