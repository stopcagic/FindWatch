import express from "express";
import GetUserCommentLikes from "../db/db_data/userCommentLikes"

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



export default router