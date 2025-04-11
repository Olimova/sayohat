
const admin = require("../auth/admin");
const client = require("../auth/client");
const { createClient, getClientById, getAllClient, updateClient, deleteClient, loginClient, logoutClient, refreshTokenClient, sendOtp, verifyOtp } = require("../controllers/client.controller");
const adminGuard = require("../middleware/guard/admin.guard");
const clientGuard = require("../middleware/guard/client.guard");

const router = require("express").Router();

router.post("/",client,adminGuard, createClient);
router.get("/:id", client, clientGuard, getClientById);
router.get("/",client,clientGuard, getAllClient);
router.put("/:id",admin, updateClient);
router.delete("/:id", client, clientGuard, deleteClient);


router.post("/login", loginClient);
router.post("/logout/:id", client, clientGuard, logoutClient);
router.post("/token", refreshTokenClient);
router.post("/send", sendOtp);
router.post("/verify", verifyOtp);


module.exports = router;
