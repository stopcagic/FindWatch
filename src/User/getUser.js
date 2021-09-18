import { ObjectId } from "mongodb"

import GetUser from "../db/db_data/GetUser";
import router from "./login";
import tokenVerify from "../Utils/tokenVerify";


router.get("/", [tokenVerify], async (req, res) => {
  const data = req.query

  try {
    if (data == null && data.userId == null) return res.status(401).send("Invalid data.");
    let user = await GetUser(data.userId);

    if (Object.keys(user).length === 0 && user.constructor === Object) return res.status(401).send("Error: User does not exist.");

    res.status(200).json(user)

  } catch (err) {
    return res.status(500).send(err)
  }
})

export default router;