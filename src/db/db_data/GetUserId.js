import { ObjectId } from "mongodb";
import connect from "../index";

export default async data => {

  if (data == null || data.userId == null) return null
  try {

    let db = await connect();

    let response = await db.collection("users").findOne({ _id: ObjectId(data.userId) })
    console.log(response);
    if (response == null) return {};

    return response._id;

  } catch (error) {
    console.log(error);
    throw "Something went wrong"
  }
}
