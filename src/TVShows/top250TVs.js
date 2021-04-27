import express from "express"
import axios from "axios"
import dotenv from "dotenv"

dotenv.config();

let router = express.Router();
let APikey = process.env.APikey;

router.get("/top250TVs", async (req, res) => {

  let request = await axios.get(`https://imdb-api.com/en/API/Top250TVs/${APikey}`)
  let data = request.data;

  res.json(data);
});




export default router;