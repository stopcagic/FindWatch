import express from "express";
import dotenv from 'dotenv';

import Utils from "./Utils/callEndpointUtil"
import tokenVerify from "./Utils/tokenVerify"
import possibleFilters from './Models/possibleFilters';
import filter from "./Utils/filterHelper"
import fetchJwId from "./Utils/imdbIdToJwId"
import GetUserData from "./db/db_data/CreateData/GetUserData";
import GetDataByProperty from "./db/db_data/GetDataByProperty"
import GetRecommendedMovies from "./db/db_data/GetRecommendedMovies";
import PatchUserData from "./db/db_data/CreateData/PatchUserData";


const router = express.Router();
dotenv.config();

router.get('/', async (_, res) => {
  res.send("Welcome to FindWatch")
})

router.get('/search', async (req, res) => {
  let word = req.query.expression;

  const requestBody = filter({ query: word })

  const { items } = await Utils.justWatchAPIfetchData(`/en_US/popular`, requestBody)

  res.json(items);
})

router.get('/info', [tokenVerify], async (req, res) => {
  try {
    let allFilters = possibleFilters
    let name = req.query.name;
    let IMDbId = req.query.id;

    let queryFilters = req.query.filters.split(",");

    let orderedFilters = allFilters.filter(x => queryFilters.includes(x)).join(",")

    let imdbId;
    if (name) {
      imdbId = await Utils.fetchID(name);
    }
    if (IMDbId) {
      imdbId = IMDbId
    }
    else {
      throw "Title does not exist or incorrect IMDB ID."
    }

    const data = await Utils.fetchInfo(imdbId, orderedFilters);

    res.json(data);

  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/jw_info', [tokenVerify], async (req, res) => {
  try {
    const type = req.query.type;
    const jw_id = req.query.jw_id;
    const imdb_id = req.query.imdb_id
    const user_id = req.query.user_id

    let id = jw_id
    if (type == undefined) throw "Missing type."
    if (id == undefined && imdb_id != undefined) id = await fetchJwId(type, imdb_id)
    if (id == 0) throw "Unable to resolve id"

    const data = await Utils.fetchJWInfo(type, id)

    const userData = await GetUserData({ userId: user_id, jwId: id, type: type })

    data.userData = userData

    res.json(data);

  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/jw_season_info', [tokenVerify], async (req, res) => {
  try {
    const show_id = req.query.show_id;
    if (show_id == undefined) throw "Unable to resolve id"

    const data = await Utils.fetchJWSeasonInfo(show_id)

    res.json(data);

  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/filter', async (req, res) => {
  try {

    const body = req.body;

    if (body == undefined) throw "Body cannot be empty."

    const options = {
      content_types: body.type != null ? [body.type] : null,
      genres: body?.genres,
      scoring_filter_types: { "imdb:score": { min_scoring_value: parseInt(body?.rating?.min), max_scoring_value: parseInt(body?.rating?.max) } },
      release_year_from: parseInt(body?.releaseYear?.from),
      release_year_until: parseInt(body?.releaseYear?.to),
      page_size: 100
    }

    const requestBody = filter(options)
    const data = await Utils.justWatchAPIfetchData(`/en_US/popular`, requestBody)

    res.send(data)
  }
  catch (error) {
    res.status(400).send(error.message)
  }

})

router.get("/:userid/:property", async (req, res) => {

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

router.get('/recommendations', async (req, res) => {
  try {

    const userId = req.query.userId;

    const movieRecommendations = await GetRecommendedMovies(userId)

    res.json(movieRecommendations)
  }
  catch (error) {
    if (error.message == undefined) res.status(500).send(error)
    res.status(500).send(error.message)
  }

})

router.get('/notifications', async (req, res) => {
  try {
    const userId = req.query.userId;

    const response = await PatchUserData(userId)

    res.json(response)
  }
  catch (error) {
    res.status(400).send(error)
  }

})

export default router