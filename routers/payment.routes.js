const { createPayment, getPaymentById, getAllPayment, updatePayment, deletePayment } = require("../controllers/payment.controller");

const router = require("express").Router();

router.post("/", createPayment);
router.get("/:id", getPaymentById);
router.get("/", getAllPayment);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

module.exports = router;
