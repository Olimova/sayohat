const ProductImage = require("../models/product_image.modul");
const db = require("../config/db");
const errorHandler = require("../helpers/error.handler");
const { productImageValidation } = require("../validation/product_image.validation");

const createProductImage = async (req, res) => {
  try {
    const { error, value } = productImageValidation(req.body);
    const { product_id, image_url, is_main, uploaded_at } =value;
    const newUser = await ProductImage.create({
      product_id,
      image_url,
      is_main,
      uploaded_at,
    });
    res.status(201).send({ message: "New User added", newUser });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllProductImage = async (req, res) => {
  try {
    const productimage = await ProductImage.findAll();
    res.status(200).send({ productimage });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getProductImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const productimage = await ProductImage.findByPk(id);
    res.status(200).send({ productimage });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateProductImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, image_url, is_main, uploaded_at } = req.body;

    const user = await ProductImage.update(
      { product_id, image_url, is_main, uploaded_at },
      { where: { id }, returning: true }
    );
    res.status(200).send({ user: user[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteProductImage = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await ProductImage.destroy({ where: { id } });
    res.status(200).send({ message: "O'chirildi", user });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  createProductImage,
  getAllProductImage,
  getProductImageById,
  updateProductImage,
  deleteProductImage,
};
