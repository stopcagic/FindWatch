import express from "express";
import connect from "../index";
import createSchemas from '../../Utils/createSchemas';
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/userCommentLikes", async (req, res) => {

  const data = req.query;

  if (data == null || data.userId == null || data.commentId == null) return res.status(422).send("Data cannot be empty.");
  try {

    let db = await connect();

    let response = await db.collection("comment_likes").findOne({ user_id: ObjectId(data.userId), comment_id: ObjectId(data.commentId) })

    if (response == null) return res.status(200);

    const user_comment_likes = createSchemas.CommentLikesSchema(response)

    res.send(user_comment_likes);
  } catch (error) {

    console.log(error);
    res.status(500).json(error)
  }
})



export default router