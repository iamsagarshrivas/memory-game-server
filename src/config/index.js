const path = require("path");

module.exports = {
  env: process.env.NODE_ENV || "development",
  root: path.join(__dirname, "../.."),
  port: process.env.PORT || 9001,
  ip: process.env.IP || "0.0.0.0",
  apiRoot: process.env.API_ROOT || "/api",
  gameFilePath: path.join(__dirname, "../../game-boards"),
};
