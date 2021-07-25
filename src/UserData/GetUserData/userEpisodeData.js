import express from "express";
import GetUserEpisodeData from "../../db/db_data/GetUserEpisodeData"

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


export default router