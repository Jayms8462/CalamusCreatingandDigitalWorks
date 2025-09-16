const express = require("express");
const path = require("path");

const app = express();

// Serve the landing page from public/
app.use(express.static(path.join(__dirname, "../public")));

// Fallback route
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
