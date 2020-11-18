const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const { root } = require("../../config");

module.exports = (apiRoot, routes) => {
  const app = express();

  app.use(cors());

  app.use("/public", express.static(path.join(root, "public")));

  app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
  app.use(bodyParser.json({ limit: "20mb" }));
  app.use(apiRoot, routes);
  return app;
};
