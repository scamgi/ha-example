const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes whitespace from both ends of a string
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0, // Ensure age is not negative
  },
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
