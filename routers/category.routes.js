const { createCategory, getCategoryById, getAllCategory, updateCategory, deleteCategory } = require("../controllers/category.controller");

const router = require("express").Router();

router.post("/", createCategory);
router.get("/:id", getCategoryById);
router.get("/", getAllCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
