const ContractItem = require("../models/contract_item.model");
const db = require("../config/db");
const errorHandler = require("../helpers/error.handler");
const {contractItemValidation}=require("../validation/contract_item.validation")

const createContractItem = async (req, res) => {
  try {
    const { error, value } = contractItemValidation(req.body);
    const { contract_id, product_id, price_per_day, total_price } = value;
    const newUser = await ContractItem.create({
      contract_id,
      product_id,
      price_per_day,
      total_price,
    });
    res.status(201).send({ message: "New User added", newUser });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllContractItem = async (req, res) => {
  try {
    const contractitem = await ContractItem.findAll();
    res.status(200).send({ contractitem });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getContractItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const contractitem = await ContractItem.findByPk(id);
    res.status(200).send({ contractitem });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateContractItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { contract_id, product_id, price_per_day, total_price } = req.body;

    const user = await ContractItem.update(
      { contract_id, product_id, price_per_day, total_price },
      { where: { id }, returning: true }
    );
    res.status(200).send({ user: user[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteContractItem = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await ContractItem.destroy({ where: { id } });
    res.status(200).send({ message: "O'chirildi", user });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  createContractItem,
  getAllContractItem,
  getContractItemById,
  updateContractItem,
  deleteContractItem,
};
