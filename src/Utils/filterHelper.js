export default options => {
  const body = {
    "age_certifications": null,
    "content_types": null,
    "presentation_types": null,
    "providers": null,
    "genres": null,
    "languages": null,
    "release_year_from": null,
    "release_year_until": null,
    "monetization_types": null,
    "min_price": null,
    "max_price": null,
    "scoring_filter_types": null,
    "cinema_release": null,
    "query": null,
    "page": null,
    "page_size": null
  };
  const paramKeys = Object.keys(body);

  for (const key in options) {
    if (paramKeys.indexOf(key) === -1) {
      throw "invalid option '" + key + "'";
    }
    else {
      body[key] = options[key];
    }
  }

  return body;
}