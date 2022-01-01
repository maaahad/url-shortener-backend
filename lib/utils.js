// ----------------------------------------------------------- //
const crypto = require("crypto");
const fetch = require("isomorphic-fetch");
const TinyUrl = require("./database/models/tinyurl");

/*
  This function create slug of specified slugLength
  To avoid capturing route parameter in case of redirecting
  to the original url, we will avoid using / in the slug
*/
async function createSlug(url, slugLength) {
  let slug = "";
  const slugBase64 = crypto.createHash("md5").update(url).digest("base64");
  const lengthSlugBase64 = slugBase64.length;

  /* eslint-disable no-constant-condition */
  while (true) {
    for (let i = 0; i < slugLength; i++) {
      const randomIndex = Math.floor(Math.random() * lengthSlugBase64);
      if (slugBase64[randomIndex] === "/") continue;
      slug += slugBase64[randomIndex];
    }

    if (await TinyUrl.findById(slug)) {
      slug = "";
    } else break;
  }
  /* eslint-enable no-constant-condition */
  return slug;
}

/*
  This function makes fetch request and this is used in testing module
*/
const _fetch = async (method, url, body) => {
  body = typeof body === "string" ? body : JSON.stringify(body);
  const headers = { "Content-Type": "application/json" };
  const res = await fetch(url, { method, body, headers });
  if (res.statusText !== "OK") {
    throw new Error(
      `[UNSUCCESSFUL_REQUEST] : Server returned with status ${res.status}`
    );
  }
  return await res.json();
};

module.exports = { createSlug, _fetch };
