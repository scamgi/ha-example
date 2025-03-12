require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import the cors Middleware
const personRoutes = require("./routes/person.routes");

const app = express();

// Middleware to parse JSON request bodies
app.use(cors()); // Add the cors middleware
app.use(express.json());
// Mount the person routes
app.use("/people", personRoutes);

// Define a simple route (for testing)
app.get("/", (req, res) => {
  res.send("API Running");
});

module.exports = app; // Export for testing
