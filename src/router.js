import express from "express";
import dotenv from 'dotenv';

import Utils from "./Utils/callEndpointUtil"
import tokenVerify from "./Utils/tokenVerify"
import possibleFilters from './Models/possibleFilters';

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

router.get('/jw_info', [tokenVerify], async (req, res) => {
  try {
    const type = req.query.type;
    const jw_id = req.query.jw_id;

    if (type == undefined && jw_id == undefined) throw "Missing type or id."

    const data = await Utils.fetchJWInfo(type, jw_id)

    res.json(data);

  } catch (error) {
    res.status(400).send(error)
  }
})
router.post('/filter', [tokenVerify], async (req, res) => {
  try {
    const options = req.body
    if (options == undefined) throw "Body cannot be empty."

    const body = {
      "age_certifications": null,
      "content_types": null,
      "presentation_types": null,
      "providers": null,
      "genres": null,
      "languages": null,
      "release_year_from": null,
      "release_year_until": null,
      "monetization_types": null,
      "min_price": null,
      "max_price": null,
      "scoring_filter_types": null,
      "cinema_release": null,
      "query": null,
      "page": null,
      "page_size": null
    };
    const paramKeys = Object.keys(body);

    for (const key in options) {
      if (paramKeys.indexOf(key) === -1) {
        throw "invalid option '" + key + "'";
      }
      else {
        body[key] = options[key];
      }
    }
    const data = await Utils.justWatchAPIfetchData(`/en_US/popular`, body)

    res.send(data)
  }
  catch (error) {
    res.status(400).send(error)
  }

})

export default router