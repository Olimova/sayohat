const { createProduct } = require("../controllers/product.controller");
const { createProductImage, getProductImageById, getAllProductImage, updateProductImage, deleteProductImage } = require("../controllers/product_image.controller");

const router = require("express").Router();

router.post("/", createProductImage);
router.get("/:id", getProductImageById);
router.get("/", getAllProductImage);
router.put("/:id", updateProductImage);
router.delete("/:id", deleteProductImage);

module.exports = router;
