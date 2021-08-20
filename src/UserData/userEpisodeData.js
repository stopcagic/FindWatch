import express from "express";
import GetUserEpisodeData from "../db/db_data/GetUserEpisodeData"
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

router.patch("/userEpisodeData/:userid/:seasonjwid/:number", async (req, res) => {

  const userId = req.params.userid
  const seasonJwId = req.params.seasonjwid
  const episodeNumber = req.params.number
  const data = req.body;

  try {
    await PatchUserEpisodeData(userId, seasonJwId, episodeNumber, data)

    res.json({ "success": true })
  } catch (err) {
    res.status(500).send(err)
  }
})
export default router