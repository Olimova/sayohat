const { createContractItem, getContractItemById, getAllContractItem, updateContractItem, deleteContractItem } = require("../controllers/contract_item.controller");

const router = require("express").Router();

router.post("/", createContractItem);
router.get("/:id", getContractItemById);
router.get("/", getAllContractItem);
router.put("/:id", updateContractItem);
router.delete("/:id", deleteContractItem);

module.exports = router;
