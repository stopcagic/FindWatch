import express from 'express';
import dotenv from 'dotenv';
import axios from "axios";

dotenv.config();
const app = express()
const port = process.env.PORT

app.get('/', async (req, res) => {

  res.send('Test')
})

app.listen(port, () => console.log(`Slušam na portu ${port}!`))


