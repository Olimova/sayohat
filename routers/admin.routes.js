const admin = require("../auth/admin");
const { createAdmin, updateAdmin, deleteAdmin, getAdminById, getAllAdmin, loginAdmin, logoutAdmin, refreshTokenAdmin } = require("../controllers/admin.controller");
const adminGuard = require("../middleware/guard/admin.guard");

const router = require("express").Router();

router.post("/",admin, createAdmin);
router.get("/:id",admin,adminGuard,getAdminById);
router.get("/",admin,adminGuard, getAllAdmin);
router.put("/:id",admin,updateAdmin)
router.delete("/:id",admin,adminGuard, deleteAdmin);

router.post("/login", loginAdmin);
router.post("/logout/:id",admin,adminGuard, logoutAdmin);
router.post("/refresh",refreshTokenAdmin)



module.exports = router;