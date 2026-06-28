import express from "express";
import { body } from "express-validator";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import protect from "../middleware/auth.js";
import validate from "../middleware/validate.js";

const router = express.Router();

// Every task route is protected
router.use(protect);

const taskValidators = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("status")
    .optional()
    .isIn(["todo", "in-progress", "done"])
    .withMessage("Invalid status"),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority"),
  body("dueDate")
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage("Invalid due date"),
];

router.route("/").get(getTasks).post(taskValidators, validate, createTask);

router
  .route("/:id")
  .get(getTask)
  .put(taskValidators, validate, updateTask)
  .delete(deleteTask);

export default router;
