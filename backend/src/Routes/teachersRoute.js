import express from "express";
import teachersController from "../Controllers/teachersController.js";

const router = express.Router();

router.route("/")
.get(teachersController.getTeachers)

router.route("/:id")
.put(teachersController.updateTeachers)
.delete(teachersController.deleteTeachers)

export default router;