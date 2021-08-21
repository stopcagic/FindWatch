import express from 'express';

import GetDataByProperty from "../db/db_data/GetDataByProperty"
import Utils from "../Utils/callEndpointUtil"

const router = express.Router();

router.get("/userData/:userid/:property", async (req, res) => {

  const userId = req.params.userid;
  const property = req.params.property;

  try {
    const response = await GetDataByProperty({ userId: userId, property: property });

    const data = []
    for (const x of response) {
      data.push(await Utils.fetchJWInfo(x.type, x.id))
    }

    if (response == null) return res.status(422).send("Data cannot be empty.")
    if (response.lenght == 0) return res.status(200);

    res.json(data)

  } catch (error) {
    res.status(500).send(error)
  }

})

export default router


