import express from "express";
import axios from "axios"
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const APikey = process.env.APikey

router.get("/commingSoon/", async (req, res) => {

  let request = await axios.get(`https://imdb-api.com/en/API/ComingSoon/${APikey}`);
  let data = request.data

  res.json(data)
})



export default router