import express from "express";
import bcrypt from "bcryptjs"
import { registrationValidation } from "../Utils/validate"
import connect from "../db/index"
import createSchemas from "../Utils/createSchemas"


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

    const user = createSchemas.CreateNewUserSchema(req, hashPassword)
    const savedUser = await db.collection("users").insertOne(user);
    res.json(savedUser.insertedId)

  } catch (err) {
    res.status(400).send(err)
  }

})

export default router;

