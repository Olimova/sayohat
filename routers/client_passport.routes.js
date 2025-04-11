const { createClient_passport, getClient_passportById, getAllClient_passport, updateClient_passport, deleteClient_passport } = require("../controllers/client_passport.controller");

const router = require("express").Router();

router.post("/", createClient_passport);
router.get("/:id", getClient_passportById);
router.get("/", getAllClient_passport);
router.put("/:id", updateClient_passport);
router.delete("/:id", deleteClient_passport);

module.exports = router;
