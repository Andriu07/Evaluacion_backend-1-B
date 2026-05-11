import express from "express";
import loginTeachersController from "../Controllers/loginTeachersController.js"

const router = express.Router();

router.route("/")
.post(loginTeachersController.login )

export default router;