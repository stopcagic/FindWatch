import express from "express"
import axios from "axios"
import dotenv from "dotenv"

dotenv.config();

let router = express.Router();
let APikey = process.env.APikey;

router.get("/seasonEpisodes", async (req, res) => {

  let name = req.query.name;
  let season = req.query.season;
  let IMDbId = req.params.id;
  let data;

  if (name) {
    let movieTitle = await axios.get(`https://imdb-api.com/en/API/SearchMovie/${APikey}/${req.params.ime}`);
    IMDbId = movieTitle.data.results[0].id;
    setTimeout(() => 2000)
    data = await fetchSeason(IMDbId, season);
  }
  else {
    data = await fetchSeason(IMDbId, season);
  }

  res.json(data);
})



let fetchSeason = async (id, season) => {
  let request = await axios.get(`https://imdb-api.com/en/API/SeasonEpisodes/${APikey}/${id}/${season}`);
  return request.data;
}

export default router;