import express from 'express';
import dotenv from 'dotenv';
import axios from "axios";
import { ObjectId } from 'mongodb';

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
import tokenVerify from "./Utils/tokenVerify"
import possibleFilters from './Models/possibleFilters';
import connect from "./db/index"
import register from "./User/register";
import login from "./User/login";
import getMovieUserData from "./UserData/GetUserData/movieUserData";
import getUserSeasonData from "./UserData/GetUserData/userSeasonData";
import getUserEpisodeData from "./UserData/GetUserData/userEpisodeData";
import getUserCommentsData from "./UserData/GetUserData/userCommentData";
import getUserCommentLikes from "./UserData/GetUserData/userCommentLikes";
import postMovieUserData from "./UserData/PostUserData/movieUserData"
import postUserSeasonData from "./UserData/PostUserData/userSeasonData"
import postUserEpisodeData from "./UserData/PostUserData/userEpisodeData"
import postUserCommentData from "./UserData/PostUserData/userCommentData"

dotenv.config();

const app = express();
const port = process.env.PORT
const APikey = process.env.APikey

app.use(express.json());

app.get('/', async (_, res) => {
  try {
    let db = await connect();
    let cursor = db.collection("users").findOne({ _id: ObjectId("60958f1fafaa5c900d746867") })

    let data = await cursor
    res.json(data)

  } catch (error) {
    console.log(error);
    res.json("Failed to fetch data")
  }

})

app.get('/search', [tokenVerify], async (req, res) => {

  let word = req.query.expression;
  let request = await axios.get(`https://imdb-api.com/en/API/SearchAll/${APikey}/${word}`);
  let data = request.data;

  res.json(data);
})

app.get('/info', [tokenVerify], async (req, res) => {

  let data;
  let allFilters = possibleFilters
  let name = req.query.name;
  let IMDbId = req.query.id;

  let queryFilters = req.query.filters.split(",");

  let orderedFilters = allFilters.filter(x => queryFilters.includes(x)).join(",")

  if (IMDbId != undefined) {
    data = await Utils.fetchInfo(IMDbId, orderedFilters);
  }
  else if (name) {
    IMDbId = await Utils.fetchID(name);

    data = await Utils.fetchInfo(IMDbId, orderedFilters);
  }
  else {
    res.status(400).send()
  }

  res.json(data);
})

app.get("/rating", [tokenVerify], async (req, res) => {

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

app.get("/boxOffice/:time", [tokenVerify], async (req, res) => {
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

app.use("/movies", [tokenVerify], searchMovies)
app.use("/movies", [tokenVerify], top250)
app.use("/movies", [tokenVerify], mostPopularMovies)
app.use("/movies", [tokenVerify], inTheaters)
app.use("/movies", [tokenVerify], commingSoon)

app.use("/series", [tokenVerify], searchTVSeries)
app.use("/series", [tokenVerify], searchEpisodes)
app.use("/series", [tokenVerify], top250TVs)
app.use("/series", [tokenVerify], seasonEpisodes)
app.use("/series", [tokenVerify], mostPopularTVSeries)

app.use("/user", register)
app.use("/user", login)

app.use("/data", [tokenVerify], getMovieUserData)
app.use("/data", [tokenVerify], getUserSeasonData)
app.use("/data", [tokenVerify], getUserEpisodeData)
app.use("/data", [tokenVerify], getUserCommentsData)
app.use("/data", [tokenVerify], getUserCommentLikes)

app.use("/data", [tokenVerify], postMovieUserData)
app.use("/data", [tokenVerify], postUserSeasonData)
app.use("/data", [tokenVerify], postUserEpisodeData)
app.use("/data", [tokenVerify], postUserCommentData)


app.listen(port, () => console.log(`http://localhost:${port}`))