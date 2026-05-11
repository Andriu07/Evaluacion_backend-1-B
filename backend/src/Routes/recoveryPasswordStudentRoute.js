import express from "express";
import recoveryPasswordStudentsController from "../Controllers/recoveryPasswordStudentsController.js"

const router = express.Router();

router.route("/requestCode")
.post(recoveryPasswordStudentsController.requestCode)
router.route("/verifyCode")
.post(recoveryPasswordStudentsController.verifyCode)
router.route("/newPassword")
.post(recoveryPasswordStudentsController.newPassword)

export default router;