import express from "express"
import axios from "axios"
import dotenv from "dotenv"
import Utils from "../Utils/callEndpointUtil"

dotenv.config();

let router = express.Router();
let APikey = process.env.APikey;

router.get("/seasonEpisodes", async (req, res) => {

  let name = req.query.name;
  let season = req.query.season;
  let IMDbId = req.query.id;
  let data;

  if (IMDbId != undefined) {
    data = await Utils.searchEpisodes(IMDbId, season);
  }
  else if (name) {
    IMDbId = await Utils.fetchID(name);

    data = await Utils.searchEpisodes(APikey, IMDbId, season);
  }
  else {
    res.status(400).json("Title does not exist or incorrect IMDB ID.")
  }

  res.json(data);
})


export default router;