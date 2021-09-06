import express from 'express';

import BaseRoutes from "./router"
import MovieRouter from "./Movies/router"
import ShowRouter from "./TVShows/router"
import register from "./User/register";
import login from "./User/login";
import patchUser from "./User/patchUserData"
import userDataRoutes from "./UserData/router"

const app = express();
const port = process.env.PORT

app.use(express.json());

app.use(BaseRoutes)

app.use("/movies", MovieRouter);
app.use("/shows", ShowRouter)

app.use("/user", register)
app.use("/user", login)
app.use("/user", patchUser)
app.use("/user", userDataRoutes)


app.listen(port, () => console.log(`http://localhost:${port}`))