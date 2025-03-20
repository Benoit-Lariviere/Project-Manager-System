const express = require("express");
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protect all task routes
router.use(authMiddleware);

router.post("/", taskController.createTask);
router.get("/", taskController.getTasks);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;