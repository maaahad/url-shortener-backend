const { _fetch } = require("../utils");

const baseUrl = "http://localhost:3001";
const originalUrl =
  "https://docs.google.com/document/d/1LoY50Tt4Ash5vCAt9OQHBKzYwW3bWrWg7jnnUBNmN8g/edit";

let tinyurlObject = "";

describe("Request Handlers Test", () => {
  test("POST /api/:slug", async () => {
    tinyurlObject = await _fetch("post", baseUrl + `/api/shorten`, {
      originalUrl,
    });
    expect(tinyurlObject).not.toBe(null);
    expect(tinyurlObject._id.length).not.toBe(0);
    expect(tinyurlObject.originalUrl).toBe(originalUrl);
  });

  test("POST /api/tinyurls/all", async () => {
    const tinyurlObjects = await _fetch("get", baseUrl + `/api/tinyurls/all`);
    expect(tinyurlObjects.length).not.toBe(0);
    expect(tinyurlObjects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: tinyurlObject._id,
        }),
      ])
    );
  });

  test("DELETE /api/delete/tinyurl/:slug", async () => {
    const deletedTinyurlObject = await _fetch(
      "delete",
      baseUrl + `/api/delete/tinyurl/${tinyurlObject._id}`
    );
    expect(deletedTinyurlObject).toEqual(tinyurlObject);
  });
});
