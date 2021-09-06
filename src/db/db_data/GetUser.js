import connect from "../index";
import { ObjectId } from "mongodb"

export default async userId => {
  try {
    let db = await connect();

    const response = await db.collection("users").findOne({ "_id": ObjectId(userId) })
    if (response == null) return {};

    return response

  } catch (error) {
    console.log(error);
    throw "Something went wrong"
  }
}