const Task = require("../models/Task");

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const task = new Task({ title, description, status, user: req.userId });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all tasks for a user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(id, { title, description, status }, { new: true });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};