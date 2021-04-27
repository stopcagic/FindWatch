import express from 'express';
import dotenv from 'dotenv';
import searchMovies from "./Movies/searchMovieTitles"
import top250 from "./Movies/top250Movies"
import mostPopular from "./Movies/mostPopular"
import inTheaters from "./Movies/inTheaters"
import commingSoon from "./Movies/commingSoon"

dotenv.config();
const app = express()
const port = process.env.PORT
const APikey = process.env.APikey


app.get('/', async (req, res) => {
  res.send('Test')
})

app.use("/movies", searchMovies)
app.use("/movies", top250)
app.use("/movies", mostPopular)
app.use("/movies", inTheaters)
app.use("/movies", commingSoon)

app.listen(port, () => console.log(`http://localhost:${port}`))


