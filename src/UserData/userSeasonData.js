import express from "express";
import GetUserSeasonData from "../db/db_data/GetUserSeasonData"
import GetUserSpeficicSeasonData from "../db/db_data/GetUserSpeficicSeasonData"
import PatchUserSeasonData from "../db/db_data/PatchUserSeasonData"

const router = express.Router();

router.get("/userSeasonData/season", async (req, res) => {
  const data = req.query;
  try {
    const response = await GetUserSpeficicSeasonData(data);
    if (response == null) return res.status(422).send("Data cannot be empty.");
    if (response == {}) return res.status(200);

    res.json(response)

  } catch (error) {
    res.status(500).send(error)
  }
})

router.get("/userSeasonData", async (req, res) => {
  const data = req.query;
  try {
    const response = await GetUserSeasonData(data);
    if (response == null) return res.status(422).send("Data cannot be empty.");
    if (response == {}) return res.status(200);

    res.json(response)

  } catch (error) {
    res.status(500).send(error)
  }
})


router.patch("/userSeasonData/:userid/:seasonjwid", async (req, res) => {

  const userId = req.params.userid
  const seasonJwId = req.params.seasonjwid
  const data = req.body;

  try {
    await PatchUserSeasonData(userId, seasonJwId, data)

    res.json({ "success": true })
  } catch (err) {
    res.status(500).send(err)
  }
})

export default router