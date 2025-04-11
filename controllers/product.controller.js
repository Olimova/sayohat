const Product = require("../models/product.models");
const db = require("../config/db");
const errorHandler = require("../helpers/error.handler");
const { productValidation } = require("../validation/product.validation");

const createProduct = async (req, res) => {
  try {
    const { error, value } = productValidation(req.body);
    const {
      name,
      description,
      category_id,
      price_per_day,
      rental_status_id,
      owner_id,
      created_at,
    } = value;
    const newUser = await Product.create({
      name,
      description,
      category_id,
      price_per_day,

      rental_status_id,
      owner_id,
      created_at,
    });
    res.status(201).send({ message: "New User added", newUser });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllProduct = async (req, res) => {
  try {
    const product = await Product.findAll();
    res.status(200).send({ product });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    res.status(200).send({ product });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      category_id,
      price_per_day,

      rental_status_id,
      owner_id,
      created_at,
    } = req.body;

    const user = await Product.update(
      {
        name,
        description,
        category_id,
        price_per_day,

        rental_status_id,
        owner_id,
        created_at,
      },
      { where: { id }, returning: true }
    );
    res.status(200).send({ user: user[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Product.destroy({ where: { id } });
    res.status(200).send({ message: "O'chirildi", user });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
