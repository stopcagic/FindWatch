import Utils from "./callEndpointUtil"
import filter from "./filterHelper"

export default async (contentType, imdbId) => {
  try {
    const { type, title } = await Utils.fetchInfo(imdbId, ["Wikipedia"])
    // const { type, title } = { type: "Movie", title: "Batman Beyond: The Movie" }
    if (type.toUpperCase() != contentType.toUpperCase()) return 0

    const requestBody = filter({
      content_types: [contentType],
      query: title
    })

    const { items } = await Utils.justWatchAPIfetchData(`/en_US/popular`, requestBody)

    let jwid = null

    for (const x of items) {
      const { external_ids } = await Utils.fetchJWInfo(contentType, x.id)
      let matchedId = external_ids.filter(id => id.external_id == imdbId);
      if (matchedId.length > 0) return x.id
    }

    if (jwid == null) return 0

    return jwid

  } catch (error) {
    return error
  }

}