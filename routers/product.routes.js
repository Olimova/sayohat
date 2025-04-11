const { createProduct, getProductById, getAllProduct, updateProduct, deleteProduct } = require("../controllers/product.controller");

const router = require("express").Router();

router.post("/", createProduct);
router.get("/:id", getProductById);
router.get("/", getAllProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
