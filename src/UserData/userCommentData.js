import express from "express";
import { ObjectId } from "mongodb"

import GetUserCommentData from "../db/db_data/GetUserCommentData"
import PostUserCommentData from "../db/db_data/PostUserCommentData"
import PostUserCommentLikes from "../db/db_data/PostUserCommentLikes"
import PatchUserCommentData from "../db/db_data/PatchUserCommentData"


const router = express.Router();

router.get("/userCommentData", async (req, res) => {

  const data = req.query;
  try {
    const response = await GetUserCommentData(data);
    if (response == null) return res.status(422).send("Data cannot be empty.");
    if (response == {}) return res.status(200);

    res.json(response)

  } catch (error) {
    res.status(500).send(error)
  }

})

router.post("/userComment", async (req, res) => {

  const data = req.body;
  try {
    const comment = await PostUserCommentData(data)

    const dataForCommentLkes = {
      userId: ObjectId(data.userId),
      commentId: ObjectId(comment.comment_id)
    }

    const commentLikes = await PostUserCommentLikes(dataForCommentLkes)

    res.json({
      "insertedCommentId": comment.comment_id,
      "insertedCommentLikesId": commentLikes.insertedId
    })

  } catch (err) {
    res.status(400).send(err)
  }
})

router.patch("/userComment/:userid/:jwid", async (req, res) => {

  const jwid = req.params.jwid
  const userId = req.params.userid
  const data = req.body;

  try {
    await PatchUserCommentData(jwid, userId, data)

    res.json({ "success": true })
  } catch (err) {
    res.status(500).send(err)
  }
})

export default router