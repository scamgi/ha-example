const request = require("supertest");
const app = require("../app"); // Import your Express app
const mongoose = require("mongoose");
const Person = require("../models/person.model");

// Before each test, connect to a test database and clear it.
beforeEach(async () => {
  const mongoURITest = "mongodb://localhost:27017/person-api-test-db"; // Use different db for test.
  await mongoose.connect(mongoURITest);
  await Person.deleteMany({}); // Clear the Person collection
});

// After each test, disconnect from the database.
afterEach(async () => {
  await mongoose.connection.close();
});

describe("Person API", () => {
  it("should create a new person", async () => {
    const res = await request(app).post("/people").send({
      name: "John",
      surname: "Doe",
      age: 30,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toEqual("John");
    expect(res.body.surname).toEqual("Doe");
    expect(res.body.age).toEqual(30);
  });

  it("should get all people", async () => {
    //First create a person to retrieve
    await request(app).post("/people").send({
      name: "John",
      surname: "Doe",
      age: 30,
    });

    const res = await request(app).get("/people");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0); // Check that we have at least one person
  });

  it("should get a single person by ID", async () => {
    //First create a person
    const postRes = await request(app).post("/people").send({
      name: "John",
      surname: "Doe",
      age: 30,
    });
    const personId = postRes.body._id;

    const getRes = await request(app).get(`/people/${personId}`);
    expect(getRes.statusCode).toEqual(200);
    expect(getRes.body.name).toEqual("John");
  });

  it("should return 404 if person not found when getting by ID", async () => {
    const nonExistentId = new mongoose.Types.ObjectId(); // Generate a valid, but non-existent ID
    const res = await request(app).get(`/people/${nonExistentId}`);
    expect(res.statusCode).toEqual(404);
  });

  it("should update a person by ID", async () => {
    const postRes = await request(app).post("/people").send({
      name: "John",
      surname: "Doe",
      age: 30,
    });
    const personId = postRes.body._id;

    const updateRes = await request(app).put(`/people/${personId}`).send({
      name: "Updated Name",
      age: 35,
    });

    expect(updateRes.statusCode).toEqual(200);
    expect(updateRes.body.name).toEqual("Updated Name");
    expect(updateRes.body.age).toEqual(35);
    // Check that the surname is the same.
    expect(updateRes.body.surname).toEqual("Doe");
  });

  it("should return 404 if person not found when updating", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .put(`/people/${nonExistentId}`)
      .send({ name: "Updated Name" });
    expect(res.statusCode).toEqual(404);
  });

  it("should return 400 if update data is invalid", async () => {
    const postRes = await request(app).post("/people").send({
      name: "John",
      surname: "Doe",
      age: 30,
    });
    const personId = postRes.body._id;

    const updateRes = await request(app)
      .put(`/people/${personId}`)
      .send({ age: -5 }); // Invalid age

    expect(updateRes.statusCode).toEqual(400); // Expect a Bad Request
  });

  it("should delete a person by ID", async () => {
    const postRes = await request(app).post("/people").send({
      name: "John",
      surname: "Doe",
      age: 30,
    });
    const personId = postRes.body._id;

    const deleteRes = await request(app).delete(`/people/${personId}`);
    expect(deleteRes.statusCode).toEqual(200);

    // Verify that the person is actually deleted
    const getRes = await request(app).get(`/people/${personId}`);
    expect(getRes.statusCode).toEqual(404);
  });

  it("should return 404 if person not found when deleting", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/people/${nonExistentId}`);
    expect(res.statusCode).toEqual(404);
  });
});
