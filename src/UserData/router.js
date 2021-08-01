import express from "express";

import getMovieUserData from "./GetUserData/movieUserData";
import getUserSeasonData from "./GetUserData/userSeasonData";
import getUserEpisodeData from "./GetUserData/userEpisodeData";
import getUserCommentsData from "./GetUserData/userCommentData";
import getUserCommentLikes from "./GetUserData/userCommentLikes";
import postMovieUserData from "./PostUserData/movieUserData"
import postUserSeasonData from "./PostUserData/userSeasonData"
import postUserEpisodeData from "./PostUserData/userEpisodeData"
import postUserCommentData from "./PostUserData/userCommentData"
import tokenVerify from "../Utils/tokenVerify"

const router = express.Router();

router.use("/data", [tokenVerify], getMovieUserData)
router.use("/data", [tokenVerify], getUserSeasonData)
router.use("/data", [tokenVerify], getUserEpisodeData)
router.use("/data", [tokenVerify], getUserCommentsData)
router.use("/data", [tokenVerify], getUserCommentLikes)

router.use("/data", [tokenVerify], postMovieUserData)
router.use("/data", [tokenVerify], postUserSeasonData)
router.use("/data", [tokenVerify], postUserEpisodeData)
router.use("/data", [tokenVerify], postUserCommentData)


export default router