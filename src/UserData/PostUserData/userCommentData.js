import express from "express";
import { ObjectId } from "mongodb"
import PostUserCommentData from "../../db/db_data/PostUserCommentData"
import PostUserCommentLikes from "../../db/db_data/PostUserCommentLikes"

const router = express.Router();

router.post("/userComment", async (req, res) => {

  const data = req.body;
  try {
    const comment = await PostUserCommentData(data)

    const dataForCommentLkes = {
      userId: ObjectId(data.userId),
      commentId: ObjectId(comment.ops[0]._id)
    }

    const commentLikes = await PostUserCommentLikes(dataForCommentLkes)

    res.json({
      "insertedCommentId": comment.ops[0]._id,
      "insertedCommentLikesId": commentLikes.ops[0]._id
    })

  } catch (err) {
    res.status(400).send(err)
  }
})

export default router;
