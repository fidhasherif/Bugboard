const express = require("express");
const router = express.Router();
const Bug = require("../models/Bug");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, async (req, res) => {
  try {
    const bug = await Bug.create({
      title: req.body.title,
      type: req.body.type,
      description: req.body.description,
      severity: req.body.severity,
      reportedBy: req.userId,
    });
    res.status(201).json(bug);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get("/", protect, async (req, res) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.json(bugs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.patch("/:id", protect, async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }
    if (bug.reportedBy.toString() !== req.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }
    bug.status = req.body.status;
    await bug.save();
    res.json(bug);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }
    if (bug.reportedBy.toString() !== req.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }
    await bug.deleteOne();
    res.json({ message: "Bug deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;