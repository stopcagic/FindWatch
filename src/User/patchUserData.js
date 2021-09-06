import { ObjectId } from "mongodb"
import bcrypt from "bcryptjs"

import connect from "../db/index"
import createSchemas from "../Utils/createSchemas"
import GetUser from "../db/db_data/GetUser";
import router from "./login";
import tokenVerify from "../Utils/tokenVerify";


router.patch("/", [tokenVerify], async (req, res) => {
  const data = req.body

  try {
    if (data == null && data.userId == null && (data.password == null || data.username == null)) return res.status(401).send("Invalid data.");

    let oldDoc = await GetUser(data.userId);

    if (Object.keys(oldDoc).length === 0 && oldDoc.constructor === Object) return res.status(401).send("Error: User does not exist.");

    const salt = await bcrypt.genSalt(10);
    const hashPassword = data.password != null ? await bcrypt.hash(data.password, salt) : null;

    const samePass = hashPassword != null ? await bcrypt.compare(hashPassword, oldDoc.password) : false;

    if (samePass) {
      return res.status(200).json({ result: "Cannot change same values." })
    }

    const sameUsername = data.username != null ? data.username == oldDoc.username : false;
    if (sameUsername) {
      return res.status(200).json({ result: "Cannot change same values." })
    }

    const userSchema = createSchemas.PatchNewUserSchema(oldDoc, data.username, hashPassword)

    let db = await connect();

    let result = await db.collection("users").updateOne(
      { _id: ObjectId(data.userId) }, { $set: userSchema });

    if (result.modifiedCount === 1) {
      return res.status(200).json({ result: "Update successful." })
    }
    else {
      throw "Failed to update document"
    }

  } catch (err) {
    return res.status(500).send(err)
  }
})

export default router;