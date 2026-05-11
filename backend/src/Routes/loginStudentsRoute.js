import express from "express";
import loginStudentsController from "../Controllers/loginStudentsController.js"

const router = express.Router();

router.route("/")
.post(loginStudentsController.login)

export default router;