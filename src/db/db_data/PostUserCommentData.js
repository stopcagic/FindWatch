import { ObjectId } from "mongodb"
import { commentDataValidation } from "../../Utils/userDataValidation"
import connect from "../../db/index"
import createSchemas from "../../Utils/createSchemas"


export default async data => {
  try {
    let date = new Date();

    let error = commentDataValidation(data, date)
    if (error) throw error;

    const db = await connect();

    const userExists = await db.collection("users").findOne({ _id: ObjectId(data.userId) })

    if (!userExists) throw "User does not exist.";

    const userComment = createSchemas.CommentSchema(data, date, true)

    const result = await db.collection("comments").insertOne(userComment);

    return result;

  } catch (err) {
    console.log(err);
    throw err
  }
}