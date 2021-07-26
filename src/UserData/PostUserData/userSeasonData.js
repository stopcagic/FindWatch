import express from "express";
import PostUserSeasonData from "../../db/db_data/PostUserSeasonData"


const router = express.Router();

router.post("/userSeasonData", async (req, res) => {

  const data = req.body;
  try {
    const response = await PostUserSeasonData(data)

    res.json({ "insertedId": response.ops[0]._id })

  } catch (err) {
    res.status(400).send(err)
  }
})

export default router;
