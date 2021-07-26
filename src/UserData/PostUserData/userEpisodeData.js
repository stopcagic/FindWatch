import express from "express";
import PostUserEpisodeData from "../../db/db_data/PostUserEpisodeData"


const router = express.Router();

router.post("/userEpisodeData", async (req, res) => {

  const data = req.body;
  try {
    const response = await PostUserEpisodeData(data)

    res.json({ "insertedId": response.ops[0]._id })

  } catch (err) {
    res.status(400).send(err)
  }
})

export default router;
