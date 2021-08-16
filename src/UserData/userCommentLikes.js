import express from "express";
import GetUserCommentLikes from "../db/db_data/GetUserCommentLikes"
import PatchUserCommentLikes from "../db/db_data/PatchUserCommentLikes"

const router = express.Router();

router.get("/userCommentLikes", async (req, res) => {

  const data = req.query;
  try {
    const response = await GetUserCommentLikes(data);
    if (response == null) return res.status(422).send("Data cannot be empty.");
    if (response == {}) return res.status(200);

    res.json(response)

  } catch (error) {
    res.status(500).send(error)
  }

})

router.patch("/userCommentLikes/:userid/:commentid", async (req, res) => {

  const commentId = req.params.commentid
  const userId = req.params.userid
  const data = req.body;

  try {
    await PatchUserCommentLikes(commentId, userId, data)

    res.json({ "success": true })
  } catch (err) {
    res.status(500).send(err)
  }
})

export default router