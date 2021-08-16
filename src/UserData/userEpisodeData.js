import express from "express";
import GetUserEpisodeData from "../db/db_data/GetUserEpisodeData"
import PostUserEpisodeData from "../db/db_data/PostUserEpisodeData"
import PatchUserEpisodeData from "../db/db_data/PatchUserEpisodeData"

const router = express.Router();

router.get("/userEpisodeData", async (req, res) => {
  const data = req.query;
  try {
    const response = await GetUserEpisodeData(data);
    if (response == null) return res.status(422).send("Data cannot be empty.");
    if (response == {}) return res.status(200);

    res.json(response)

  } catch (error) {
    res.status(500).send(error)
  }
})

router.post("/userEpisodeData", async (req, res) => {

  const data = req.body;
  try {
    const response = await PostUserEpisodeData(data)

    res.json({ "insertedId": response.ops[0]._id })

  } catch (err) {
    res.status(400).send(err)
  }
})

router.patch("/userEpisodeData/:seasondataid", async (req, res) => {

  const seasonDataId = req.params.seasondataid
  const data = req.body;

  try {
    await PatchUserEpisodeData(seasonDataId, data)

    res.json({ "success": true })
  } catch (err) {
    res.status(500).send(err)
  }
})
export default router