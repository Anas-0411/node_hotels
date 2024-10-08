const express = require("express");
const router = express.Router();
const MenuItem = require("./../models/Menu");

// Post method to create new menuitems
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log("Data Saved Successfully!");
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// Get method to get all menuitems
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Data Fetched Successfully!");
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// Get method to get menuitems by taste
router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    if (taste == "spicy" || taste == "sour" || taste == "sweet") {
      const data = await MenuItem.find({ taste: taste });
      console.log("Data Fetched Successfully!");
      res.status(200).send(data);
    } else {
      res.status(404).send("Invalid Taste Input");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// Put method to update the existing menuItem
router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const updatedMenuData = req.body;
    const data = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
      new: true,
      runValidators: true,
    });
    if (!data) {
      res.status(404).send("MenuItem Not Found");
    }
    console.log("Data Updated!");
    res.status(201).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// Delete method to delete existing menuitem
router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const deletedMenuItem = await MenuItem.findByIdAndDelete(menuId);
    if (!deletedMenuItem) {
      res.status(404).json({ error: "MenuItem Not Found" });
    }
    res.status(201).send("MenuItem Deleted Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
