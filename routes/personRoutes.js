const express = require("express");
const router = express.Router();
const Person = require("../models/person");

// Post method to create new person
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("Data Saved Successfully!");
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// Get method to get all person
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data Fetched Successfully!");
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// Get method to get person by work
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const data = await Person.find({ work: workType });
      console.log("Data Fetched Successfully!");
      res.status(200).send(data);
    } else {
      res.status(404).send("Invalid Worktype");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// Put method to update the existing person
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const data = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true,
      runValidators: true,
    });
    if (!data) {
      res.status(404).send("Person Not Found");
    }
    console.log("Data Updated");
    res.status(201).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// Delete method to delete existing person
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const deletedPerson = await Person.findByIdAndDelete(personId);
    if (!deletedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.json({ message: "Person deleted successfully" });
  } catch (error) {
    console.error("Error deleting person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
