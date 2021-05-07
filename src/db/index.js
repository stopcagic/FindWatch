import { MongoClient } from ("mongodb")
import dotenv from "dotenv";

dotenv.config();

const db_pw = process.env.DB_PASSWORD

const uri = `mongodb+srv://admin:${db_pw}@users.nxuyt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
);

let db = null

export default () => {
  return new Promise((resolve, reject) => {

    if (db && client.isConnected()) {
      resolve(db)
    }
    else {
      client.connect(err => {
        if (err) {
          reject("Spajanje na bazu nije uspjelo:" + err);
        }
        else {
          console.log("Database connected successfully!");
          db = client.db("FindWatch");
          resolve(db);
        }
      });
    }
  });
}
