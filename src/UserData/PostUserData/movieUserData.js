import express from "express";
import PostMovieUserData from "../../db/db_data/PostMovieUserData"


const router = express.Router();

router.post("/userData", async (req, res) => {

  const data = req.body;
  try {
    const response = await PostMovieUserData(data)

    res.json({ "insertedId": response.ops[0]._id })

  } catch (err) {
    res.status(400).send(err)
  }
})

export default router;
