require("dotenv").config();
const express = require("express");
// const personRoutes = require("./routes/person.routes");

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount the person routes
// app.use("/people", personRoutes);

// Define a simple route (for testing)
app.get("/", (req, res) => {
  res.send("API Running");
});

module.exports = app; // Export for testing
