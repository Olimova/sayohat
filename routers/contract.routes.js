const { createContract, getContractById, getAllContract, updateContract, deleteContract } = require("../controllers/contract.controller");

const router = require("express").Router();

router.post("/", createContract);
router.get("/:id", getContractById);
router.get("/", getAllContract);
router.put("/:id", updateContract);
router.delete("/:id", deleteContract);

module.exports = router;
