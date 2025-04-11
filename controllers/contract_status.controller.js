const ContractStatus = require("../models/contract_status.model");
const db = require("../config/db");
const errorHandler = require("../helpers/error.handler");
const { contractStatusValidation } = require("../validation/contract_status.validation");

const createContractStatus = async (req, res) => {
  try {
    const { error, value } = contractStatusValidation(req.body);
    const { name } = value;
    const newUser = await ContractStatus.create({
      name,
    });
    res.status(201).send({ message: "New User added", newUser });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllContractStatus = async (req, res) => {
  try {
    const contractstatus = await ContractStatus.findAll();
    res.status(200).send({ contractstatus });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getContractStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const contractstatus = await ContractStatus.findByPk(id);
    res.status(200).send({ contractstatus });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateContractStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const user = await ContractStatus.update(
      { name },
      { where: { id }, returning: true }
    );
    res.status(200).send({ user: user[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteContractStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await ContractStatus.destroy({ where: { id } });
    res.status(200).send({ message: "O'chirildi", user });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  createContractStatus,
  getAllContractStatus,
  getContractStatusById,
  updateContractStatus,
  deleteContractStatus,
};
