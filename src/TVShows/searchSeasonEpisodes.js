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
    let SeriesTitle = await axios.get(`https://imdb-api.com/en/API/SearchSeries/${APikey}/${name}`);
    IMDbId = SeriesTitle.data.results[0].id;

    data = await Utils.searchEpisodes(APikey, IMDbId, season);
  }
  else {
    res.status(400).json("Title does not exist or incorrect IMDB ID.")
  }

  res.json(data);
})


export default router;