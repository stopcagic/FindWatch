import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default (req, res, next) => {
  try {
    const auth = req.headers.authorization.split(" ");
    if (!auth) {
      res.status(401).send("Access denied.")
    }
    const type = auth[0];
    const token = auth[1];

    if (type !== "Bearer") {
      return res.status(401).send("Access denied.")
    } else {
      req.jwt = jwt.verify(token, process.env.TOKEN_SECRET);
      return next();
    }
  } catch (error) {
    res.status(401).send("Access denied.")
  }

}