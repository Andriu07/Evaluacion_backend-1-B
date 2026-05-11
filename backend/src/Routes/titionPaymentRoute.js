import express from "express";
import titionPaymentController from "../Controllers/titionPaymentController.js";

const router = express.Router();

router.route("/")
.get(titionPaymentController.getTitionPayment)
.post(titionPaymentController.insertTitionPayment)
.put(titionPaymentController.updateTitionPayment)
.delete(titionPaymentController.deleteTitionPayment)

export default router;