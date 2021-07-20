import express from "express";
import connect from "../index";
import createSchemas from '../../Utils/createSchemas';
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/userCommentData", async (req, res) => {

  const data = req.query;

  if (data == null || data.userId == null || data.imdbId == null) return res.status(422).send("Data cannot be empty.");
  try {

    let db = await connect();

    let response = await db.collection("comments").findOne({ user_id: ObjectId(data.userId), imdb_id: data.imdbId })

    if (response == null) return res.status(200);

    const user_comment_schema = createSchemas.CommentSchema(response)

    res.send(user_comment_schema);
  } catch (error) {

    console.log(error);
    res.status(500).json(error)
  }
})



export default router