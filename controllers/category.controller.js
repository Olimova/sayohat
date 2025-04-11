const Category = require("../models/category.model");
const db = require("../config/db");
const errorHandler = require("../helpers/error.handler");
const { categoryValidation } = require("../validation/category.validation");

const createCategory = async (req, res) => {
  try {
    const { error, value } = categoryValidation(req.body);
    const { name} = value;
    const newCategory = await Category.create({
      name,
    });
    res.status(201).send({ message: "New Category added", newCategory });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllCategory = async (req, res) => {
  try {
    const category = await Category.findAll();
    res.status(200).send({ category });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    res.status(200).send({ category });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const {name } = req.body;

    const category = await Category.update(
      {name, },
      { where: { id }, returning: true }
    );
    res.status(200).send({ category: category[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.destroy({ where: { id } });
    res.status(200).send({ message: "O'chirildi", category });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
