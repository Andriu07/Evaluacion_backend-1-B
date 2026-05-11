import express from "express";
import subjectController from "../Controllers/subjectController.js";

const router = express.Router();

router.route("/")
.get(subjectController.getSubject)
.post(subjectController.insertSubject)
.put(subjectController.upateSubject)
.delete(subjectController.upateSubject)

export default router;