// ----------------------------------------------------------- //
const express = require("express");
const cors = require("cors");
const { credentials } = require("./config");
const { redirectToOriginalUrl } = require("./lib/handlers");

// ----------------------------------------------------------- //
const app = express();
const loggingService = require("./lib/middlewares/logging")(app);
const apiRouter = require("./lib/api");

// ----------------------------------------------------------- //
// middlewares
app.use(cors());
app.use(express.json());
loggingService.activate();

// adding routes to the express app
app.use("/api", apiRouter);
app.get("/:slug", redirectToOriginalUrl);

// custom 404 - Not Found page
app.use((req, res) => {
  res.status(404).send("<h2>404 - Not Found</h2>");
});

// custom 500 - Server Error page
/* eslint-disable no-unused-vars */
app.use((error, req, res, next) => {
  console.log(error.message);
  res.status(500).send("<h2>500 - Server Error</h2>");
});
/* eslint-enable no-unused-vars */

// function to start the server
function startServer(port) {
  app.listen(port, () => {
    console.log(
      `Server started in ${app.get(
        "env"
      )} mode on http://localhost:${port};\n` + `press ctrt + c to terminate.`
    );
  });
}

if (require.main === module) {
  //   if this scripts is run as top level scripts, start the app server
  startServer(credentials.site.port);
} else {
  // will be used in this this file is used as an imported module by another module
  module.exports = startServer;
}
