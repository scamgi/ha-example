const express = require("express");
const mongoose = require("mongoose");
const personRoutes = require("./routes/person.routes");
require("dotenv").config();
console.log(process.env.MONGODB_URI);
console.log(process.env.PORT);

const app = express();
const port = process.env.PORT || 3000;
const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/person-api-db"; //Change for your connection string

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Could not connect to MongoDB", err);
    process.exit(1); // Exit the process if we can't connect to the DB
  });

// Mount the person routes
app.use("/people", personRoutes);

// Start the server (only if this file is run directly)
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
module.exports = app; // Export for testing
