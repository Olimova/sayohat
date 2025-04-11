const {
  createContractStatus,
  getContractStatusById,
  getAllContractStatus,
  updateContractStatus,
  deleteContractStatus,
} = require("../controllers/contract_status.controller");

const router = require("express").Router();

router.post("/", createContractStatus);
router.get("/:id", getContractStatusById);
router.get("/", getAllContractStatus);
router.put("/:id", updateContractStatus);
router.delete("/:id", deleteContractStatus);

module.exports = router;
