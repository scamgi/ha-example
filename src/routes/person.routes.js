const express = require("express");
const router = express.Router();
const Person = require("../models/person.model");

// Create a new person
router.post("/", async (req, res) => {
  try {
    const person = new Person(req.body);
    await person.save();
    res.status(201).send(person); // 201 Created
  } catch (error) {
    res.status(400).send(error); // 400 Bad Request
  }
});

// Get all people
router.get("/", async (req, res) => {
  try {
    const people = await Person.find({});
    res.send(people);
  } catch (error) {
    res.status(500).send(error); // 500 Internal Server Error
  }
});

// Get a single person by ID
router.get("/:id", async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).send(); // 404 Not Found
    }
    res.send(person);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a person by ID
router.put("/:id", async (req, res) => {
  try {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validation on update
    });

    if (!person) {
      return res.status(404).send();
    }

    res.send(person);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a person by ID
router.delete("/:id", async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    if (!person) {
      return res.status(404).send();
    }
    res.send(person);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
