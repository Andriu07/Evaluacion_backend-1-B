import express from "express";
import studentsController from "../Controllers/studentsController.js";

const router = express.Router();

router.route("/")
.get(studentsController.getStudents)

router.route("/:id")
.put(studentsController.updateStudents)
.delete(studentsController.deleteStudents)

export default router;