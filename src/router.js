import express from "express";
import dotenv from 'dotenv';
import axios from "axios";

import Utils from "./Utils/callEndpointUtil"
import tokenVerify from "./Utils/tokenVerify"
import possibleFilters from './Models/possibleFilters';

const router = express.Router();
dotenv.config();


const APikey = process.env.APikey
const imdbBaseUrl = process.env.imdbApiUrl

router.get('/', async (_, res) => {
  res.send("Welcome to FindWatch")
})

router.get('/search', [tokenVerify], async (req, res) => {

  let word = req.query.expression;
  let request = await axios.get(`${imdbBaseUrl}/SearchAll/${APikey}/${word}`);
  let data = request.data;

  res.json(data);
})

router.get('/info', [tokenVerify], async (req, res) => {
  try {
    let data;
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

    data = await Utils.fetchInfo(imdbId, orderedFilters);

    res.json(data);

  } catch (error) {
    res.status(400).send(error)
  }
})

export default router