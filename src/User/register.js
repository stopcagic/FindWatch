import express from "express";
import bcrypt from "bcryptjs"
import { registrationValidation } from "../Utils/validate"
import connect from "../db/index"
import User from "../Models/userSchema"

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    let error = registrationValidation(req.body)
    if (error) throw error;

    const db = await connect();

    const userExists = await db.collection("users").findOne({ email: req.body.email })
    if (userExists) throw "User already exists.";

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
      username: req.body.username,
      password: hashPassword,
      email: req.body.email,
      registeredAt: new Date(),
      lastLogin: new Date(),
      isLoggedIn: true,
      userData: null
    })
    const savedUser = await db.collection("users").insertOne(user);
    //insertati prazan userData
    //isto tako watchingData
    //comment ne treba
    res.json(savedUser.insertedId)

  } catch (err) {
    res.status(400).send(err)
  }

})


export default router;