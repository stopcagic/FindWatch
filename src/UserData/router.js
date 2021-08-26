import express from "express";

import movieUserData from "./movieUserData";
import userSeasonData from "./userSeasonData";
import userEpisodeData from "./userEpisodeData";
import userCommentsData from "./userCommentData";
import userCommentLikes from "./userCommentLikes";
import tokenVerify from "../Utils/tokenVerify"

const router = express.Router();

router.use("/data", [tokenVerify], movieUserData)
router.use("/data", [tokenVerify], userSeasonData)
router.use("/data", [tokenVerify], userEpisodeData)
router.use("/data", [tokenVerify], userCommentsData)
router.use("/data", [tokenVerify], userCommentLikes)


export default router