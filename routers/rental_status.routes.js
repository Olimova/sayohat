const { createRentalStatus, getRentalStatusById, getAllRentalStatus, updateRentalStatus, deleteRentalStatus } = require("../controllers/rental_status.controller");

const router = require("express").Router();

router.post("/", createRentalStatus);
router.get("/", getAllRentalStatus);
router.get("/:id", getRentalStatusById);
router.put("/:id", updateRentalStatus);
router.delete("/:id", deleteRentalStatus);

module.exports = router;
