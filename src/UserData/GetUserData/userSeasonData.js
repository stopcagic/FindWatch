import express from "express";
import GetUserSeasonData from "../../db/db_data/GetUserSeasonData"

const router = express.Router();

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


export default router