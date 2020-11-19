const http = require("http");
const { existsSync, mkdirSync } = require("fs");
const { env, port, ip, apiRoot, gameFilePath } = require("./config");
const express = require("./middleware/express");
const api = require("./api");

const app = express(apiRoot, api);
const server = http.createServer(app);

if (!existsSync(gameFilePath)) {
  mkdirSync(gameFilePath);
}

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log(
      "Express server listening on http://%s:%d, in %s mode",
      ip,
      port,
      env
    );
  });
});

module.exports = app;
