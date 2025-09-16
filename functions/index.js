const functions = require("firebase-functions");
const app = require("./app");

// Export the Express app as a Firebase Function (1st Gen)
exports.app = functions.https.onRequest(app);
