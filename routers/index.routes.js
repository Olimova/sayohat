const router = require("express").Router();

router.use("/admin", require("./admin.routes"));
router.use("/product", require("./product.routes"));
router.use("/payment", require("./payment.routes"));
router.use("/owner", require("./owner.routes"));
router.use("/passport", require("./client_passport.routes"));
router.use("/client", require("./client.routes"));
router.use("/category", require("./category.routes"));
router.use("/contractItem", require("./contract_item.routes"));
router.use("/contract", require("./contract.routes"));
router.use("/contractStatus", require("./contract_status.routes"));
router.use("/productImage", require("./product_image.routes"));
router.use("/rentalStatus", require("./rental_status.routes"));

module.exports = router;
