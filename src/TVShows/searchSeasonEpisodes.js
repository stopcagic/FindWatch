import express from "express"
import axios from "axios"
import dotenv from "dotenv"

dotenv.config();

let router = express.Router();
let APikey = process.env.APikey;

router.get("/seasonEpisodes", async (req, res) => {

  let name = req.query.name;
  let season = req.query.season;
  let IMDbId = req.query.id;
  let data;

  if (name) {
    let SeriesTitle = await axios.get(`https://imdb-api.com/en/API/SearchSeries/${APikey}/${name}`);
    IMDbId = SeriesTitle.data.results[0].id;

    data = await fetchSeason(IMDbId, season);
  }
  else if (IMDbId) {
    data = await fetchSeason(IMDbId, season);
  }
  else {
    res.json({ error: "You need to send either name or IMDb ID" })
  }

  res.json(data);
})



let fetchSeason = async (id, season) => {
  let request = await axios.get(`https://imdb-api.com/en/API/SeasonEpisodes/${APikey}/${id}/${season}`);
  return request.data;
}

export default router;