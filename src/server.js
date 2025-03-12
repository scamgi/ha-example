const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

console.log(process.env.MONGODB_URI);
console.log(process.env.PORT);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Routes (we'll add these later)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
