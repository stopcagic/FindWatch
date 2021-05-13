import express from 'express';
import dotenv from 'dotenv';
import axios from "axios";

import searchMovies from "./Movies/searchMovieTitles"
import top250 from "./Movies/top250Movies"
import mostPopularMovies from "./Movies/mostPopular"
import inTheaters from "./Movies/inTheaters"
import commingSoon from "./Movies/commingSoon"
import searchTVSeries from "./TVShows/searchTVSeriesTitles"
import searchEpisodes from "./TVShows/searchEpisodes"
import top250TVs from "./TVShows/top250TVs"
import seasonEpisodes from "./TVShows/searchSeasonEpisodes"
import mostPopularTVSeries from "./TVShows/mostPopular"
import Utils from "./Utils/callEndpointUtil"
import possibleFilters from './Models/possibleFilters';
import connect from "./db/index"

dotenv.config();
const app = express()
const port = process.env.PORT
const APikey = process.env.APikey

app.get('/', async (req, res) => {
  try {
    let db = await connect();
    let cursor = db.collection("users").find()

    cursor.forEach(element => {
      res.json(element)
    });

  } catch (error) {
    console.log(error);
    res.json("Failed to fetch data")
  }

})

app.get('/search', async (req, res) => {

  let word = req.query.expression;
  let request = await axios.get(`https://imdb-api.com/en/API/SearchAll/${APikey}/${word}`);
  let data = request.data;

  res.json(data);
})

app.get('/info', async (req, res) => {

  let data;
  let allFilters = possibleFilters
  let name = req.query.name;
  let IMDbId = req.query.id;

  let filters = req.query.filters
  filters = filters.split(",");

  let queryFilters = allFilters.map(x => {
    if (filters.includes(x)) return x;
  })

  queryFilters = queryFilters.filter(x => x != null).join(",");

  if (IMDbId != undefined) {
    data = await Utils.fetchInfo(IMDbId, queryFilters);
  }
  else if (name) {
    IMDbId = await Utils.fetchID(name);

    data = await Utils.fetchInfo(IMDbId, queryFilters);
  }
  else {
    res.status(400).send()
  }

  res.json(data);
})

app.get("/rating", async (req, res) => {

  let name = req.query.name;
  let IMDbId = req.query.id;
  let data;

  if (IMDbId != undefined) {
    data = await Utils.fetchRatings(IMDbId);
  }
  else if (name) {
    IMDbId = await Utils.fetchID(name);
    data = await Utils.fetchRatings(IMDbId);
  }
  else {
    res.status(400).json("Title does not exist or incorrect IMDB ID.")
  }

  res.json(data);
})

app.get("/boxOffice/:time", async (req, res) => {
  let filter = req.params.time;
  let data;
  if (filter == 'allTime') {
    let request = await axios.get(`https://imdb-api.com/en/API/BoxOfficeAllTime/${APikey}`)
    data = request.data;

  }
  else if (filter == 'week') {
    let request = await axios.get(`https://imdb-api.com/en/API/BoxOffice/${APikey}`)
    data = request.data;
  }

  res.json(data);
})

app.use("/movies", searchMovies)
app.use("/movies", top250)
app.use("/movies", mostPopularMovies)
app.use("/movies", inTheaters)
app.use("/movies", commingSoon)

app.use("/series", searchTVSeries)
app.use("/series", searchEpisodes)
app.use("/series", top250TVs)
app.use("/series", seasonEpisodes)
app.use("/series", mostPopularTVSeries)


app.listen(port, () => console.log(`http://localhost:${port}`))