import { ObjectId } from "mongodb";
import connect from "../index";
import createSchemas from '../../Utils/createSchemas';
import GetUserCommentLikes from "./GetUserCommentLikes";

export default async data => {
  if (data == null || data.jwId == null) return null;
  try {
    let db = await connect();

    let cursor = null

    if (data.seasonJwId == null)
      cursor = await db.collection("comments").find({ jw_id: data.jwId, season_jw_id: null, episode_number: null })

    if (data.seasonJwId != null && data.episodeNumber == null)
      cursor = await db.collection("comments").find({ jw_id: data.jwId, season_jw_id: parseInt(data.seasonJwId), episode_number: null })

    if (data.seasonJwId != null && data.episodeNumber != null)
      cursor = await db.collection("comments").find({ jw_id: data.jwId, season_jw_id: parseInt(data.seasonJwId), episode_number: parseInt(data.episodeNumber) })

    if (cursor == null) throw "Something went wrong"

    const comments = await cursor.toArray()
    if (comments == null) return {};

    let responseArray = []

    for (const x of comments) {
      const commentLikes = await GetUserCommentLikes({ commentId: x._id })

      if (commentLikes != null && commentLikes.length > 0)
        x.reactions = commentLikes.map(y => createSchemas.CommentLikesSchema(y))

      responseArray.push(createSchemas.CommentSchema(x))
    }

    return responseArray

  } catch (error) {

    console.log(error);
    throw "Something went wrong"
  }
}


