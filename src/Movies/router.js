import express from "express";
import fetch from "./fetchMovieData"

const router = express.Router();

router.get("/commingSoon/", async (req, res) => {
  try {
    const data = await fetch.UpcommingMovies();

    res.json(data)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/inTheaters/", async (req, res) => {
  try {
    const data = await fetch.MoviesInTheaters();

    res.json(data)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/mostPopular/", async (req, res) => {
  try {
    const data = await fetch.MostPopularMovies();

    res.json(data)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/name/:ime", async (req, res) => {
  try {
    if (req.params.ime == undefined) throw "Movie name is required."
    const data = await fetch.SearchMovies(req.params.ime);

    res.json(data)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/top250/", async (req, res) => {
  try {
    const data = await fetch.Top250Movies();

    res.json(data)
  } catch (error) {
    res.status(400).json(error)
  }
})
router.get("/boxOffice/:time", async (req, res) => {
  try {
    const data = await fetch.BoxOffice(req.params.time);

    res.json(data)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router