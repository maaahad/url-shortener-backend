const db = require("./database/db");

module.exports = {
  getAllTinyUrls: async (req, res) => {
    const tinyUrls = await db.getAllTinyUrls();
    res.status(200).json(tinyUrls);
  },

  shortenUrl: async (req, res) => {
    let tinyUrlObject = await db.findTinyUrlByOriginalUrl(req.body.originalUrl);
    if (!tinyUrlObject)
      tinyUrlObject = await db.shortenUrl(req.body.originalUrl);
    res.status(200).json(tinyUrlObject);
  },

  redirectToOriginalUrl: async (req, res, next) => {
    const tinyUrlObject = await db.getOriginalUrl(req.params.slug);

    // if urlObject null, we return to the custom 404 - Not found page
    if (!tinyUrlObject) return next();

    res.redirect(tinyUrlObject.originalUrl);
  },

  deleteTinyUrl: async (req, res) => {
    const deletedTinyUrlObject = await db.deleteTinyUrl(req.params.slug);
    res.status(200).json(deletedTinyUrlObject);
  },

  deleteAllTinyUrls: async (req, res) => {
    const noOfTinyUrlDeleted = await db.deleteAllTinyUrls();
    res.status(200).json({ totalDeleted: noOfTinyUrlDeleted });
  },
};
