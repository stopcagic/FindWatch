import express from 'express';
import axios from "axios"

const app = express()
const port = process.env.PORT

app.get('/', async (req, res) => {

  res.send('Test')
})

app.listen(port, () => console.log(`Slušam na portu ${port}!`))


