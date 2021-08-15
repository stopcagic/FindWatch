import express from "express";
import dotenv from 'dotenv';

import Utils from "./Utils/callEndpointUtil"
import tokenVerify from "./Utils/tokenVerify"
import possibleFilters from './Models/possibleFilters';
import filter from "./Utils/filterHelper"
import fetchJwId from "./Utils/imdbIdToJwId"

const router = express.Router();
dotenv.config();

const APikey = process.env.APikey

router.get('/', async (_, res) => {
  res.send("Welcome to FindWatch")
})

router.get('/search', [tokenVerify], async (req, res) => {

  let word = req.query.expression;
  let data = await Utils.imdbAPIfetchData(`/SearchAll/${APikey}/${word}`);

  res.json(data);
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

router.post('/jw_info', [tokenVerify], async (req, res) => {
  try {
    const type = req.body.type;
    const jw_id = req.body.jw_id;
    const imdb_id = req.body.imdb_id
    let id = jw_id
    if (type == undefined) throw "Missing type."
    if (id == undefined && imdb_id != undefined) id = await fetchJwId(type, imdb_id)
    if (id == 0) throw "Unable to resolve id"

    const data = await Utils.fetchJWInfo(type, id)

    res.json(data);

  } catch (error) {
    res.status(400).send(error)
  }
})
router.post('/filter', [tokenVerify], async (req, res) => {
  try {

    const body = req.body;

    if (body == undefined) throw "Body cannot be empty."

    const options = {
      content_types: [body.type],
      genres: body?.genres,
      scoring_filter_types: { "imdb:score": { min_scoring_value: body?.rating?.min, max_scoring_value: body?.rating?.max } },
      release_year_from: body?.releaseYear?.from,
      release_year_until: body?.releaseYear?.to
    }

    const requestBody = filter(options)
    const data = await Utils.justWatchAPIfetchData(`/en_US/popular`, requestBody)

    res.send(data)
  }
  catch (error) {
    res.status(400).send(error.message)
  }

})

export default router