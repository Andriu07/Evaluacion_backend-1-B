import express from "express";
import recoveryPasswordTeachersController from "../Controllers/recoveryPasswordTeachersController.js"

const router = express.Router();

router.route("/requestCode")
.post(recoveryPasswordTeachersController.requestCode)
router.route("/verifyCode")
.post(recoveryPasswordTeachersController.verifyCode)
router.route("/newPassword")
.post(recoveryPasswordTeachersController.newPassword)

export default router;