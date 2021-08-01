import express from "express";
import fetch from "./fetchShowData"

const router = express.Router();

router.get("/mostPopular/", async (req, res) => {
  try {
    const data = await fetch.MostPopularShows();

    res.json(data)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/episodes/:ime", async (req, res) => {
  try {
    if (req.params.ime == undefined) throw "Episode name is required."
    const data = await fetch.SearchEpiodeByName(req.params.ime);

    res.json(data)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/seasonEpisodes", async (req, res) => {
  try {
    let name = req.query.name;
    let season = req.query.season;
    let IMDbId = req.query.id;
    const data = await fetch.GetEpisodesFromSeason(IMDbId, name, season);

    res.json(data)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/name/:ime", async (req, res) => {
  try {
    if (req.params.ime == undefined) throw "Episode name is required."
    const data = await fetch.SearchShows(req.params.ime);

    res.json(data)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/top250TVs", async (req, res) => {
  try {
    const data = await fetch.Top250Shows();

    res.json(data)
  } catch (error) {
    res.status(400).json(error)
  }
})


export default router