const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const app = require("./app");

exports.app = onRequest({ region: "us-central1" }, app);