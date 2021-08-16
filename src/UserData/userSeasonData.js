import express from "express";
import GetUserSeasonData from "../db/db_data/GetUserSeasonData"
import PostUserSeasonData from "../db/db_data/PostUserSeasonData"
import PatchUserSeasonData from "../db/db_data/PatchUserSeasonData"

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

router.post("/userSeasonData", async (req, res) => {

  const data = req.body;
  try {
    const response = await PostUserSeasonData(data)

    res.json({ "insertedId": response.ops[0]._id })

  } catch (err) {
    res.status(400).send(err)
  }
})

router.patch("/userSeasonData/:userid/:userdataid", async (req, res) => {

  const userDataId = req.params.userdataid
  const userId = req.params.userid
  const data = req.body;

  try {
    await PatchUserSeasonData(userId, userDataId, data)

    res.json({ "success": true })
  } catch (err) {
    res.status(500).send(err)
  }
})

export default router