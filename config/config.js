// winston-config-stream.js
 let path = require("path"),
  fs = require("fs"),
  nconf = require("nconf");


nconf.argv()
  .env()
  .file({file: path.join(__dirname, 'config.json')});

  module.exports = nconf;