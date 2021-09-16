import express from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import connect from "../db/index"
import { loginValidation } from "../Utils/userValidation"

dotenv.config();

const router = express.Router()

router.post("/login", async (req, res) => {
  try {
    let error = loginValidation(req.body)
    if (error) throw error;

    const db = await connect();
    let user = null

    if (req.body.email) {
      user = await db.collection("users").findOne({ email: req.body.email })
      if (!user) throw "Invalid username or email.";
    }
    else if (req.body.username) {
      user = await db.collection("users").findOne({ username: req.body.username })
      if (!user) throw "Invalid username or email.";
    }

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) throw "Invalid password."

    const token = jwt.sign({
      id: user._id,
      username: user.username,
      email: user.email,
    }, process.env.TOKEN_SECRET, { expiresIn: "1w" })

    res.send({
      token: token,
      username: user.username,
      user_id: user._id
    })

  } catch (error) {
    console.log(error);
    res.status(400).send(error)
  }
})

export default router;