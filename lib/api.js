const express = require("express");
const handlers = require("./handlers");

const router = express.Router();

// api routes
router.get("/tinyurls/all", handlers.getAllTinyUrls);
router.post("/shorten", handlers.shortenUrl);
router.delete("/delete/tinyurl/:slug", handlers.deleteTinyUrl);
router.delete("/delete/tinyurls/all", handlers.deleteAllTinyUrls);

module.exports = router;
