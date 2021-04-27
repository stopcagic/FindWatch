import express from 'express';
import dotenv from 'dotenv';
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

dotenv.config();
const app = express()
const port = process.env.PORT
const APikey = process.env.APikey


app.get('/', async (req, res) => {
  res.send('Test')
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
