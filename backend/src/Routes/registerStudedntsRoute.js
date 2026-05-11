import express from "express";
import registerStudentsController from "../Controllers/registerStudentsController.js";

const router = express.Router();

router.route("/")
.post(registerStudentsController.register)

router.route("/verifyCode")
.post(registerStudentsController.verifyCode )


export default router;