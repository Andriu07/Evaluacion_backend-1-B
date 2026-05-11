import express from "express";
import specialityController from "../Controllers/specialityController.js";

const router = express.Router();

router.route("/")
.get(specialityController.getSpeciality)
.post(specialityController.insertSpeciality)
.put(specialityController.updateSpeciality)
.delete(specialityController.deleteSpeciality)

export default router;