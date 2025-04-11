const admin = require("../auth/admin");
const owner = require("../auth/owner");
const { createOwner, getOwnerById, getAllOwner, updateOwner, deleteOwner,  refreshToken, loginOwner, logoutOwner, sendOtp, verifyOtp } = require("../controllers/owner.controller");
const adminGuard = require("../middleware/guard/admin.guard");
const ownerGuard = require("../middleware/guard/owner.guard");

const router = require("express").Router();

router.post("/",owner,adminGuard ,createOwner);
router.get("/:id",owner,ownerGuard, getOwnerById);
router.get("/",owner,ownerGuard, getAllOwner);
router.put("/:id",admin, updateOwner);
router.delete("/:id",owner,ownerGuard, deleteOwner);


router.post("/login",loginOwner);
router.post("/logout/:id", logoutOwner);
router.post("/refresh", refreshToken);
router.post("/send", sendOtp);
router.post("/verify", verifyOtp);

module.exports = router;
