const Contract = require("../models/contract.modul");
const db = require("../config/db");
const errorHandler = require("../helpers/error.handler");
const { contrcatValidation } = require("../validation/contract.validation");

const createContract = async (req, res) => {
  try {
    const { error, value } = contrcatValidation(req.body);
    const {
      first_name,
      last_name,
      email,
      password,
      role,
      is_active,
      created_at,
      interests,
      phone,
    } = value;
    const newContract = await Contract.create({
      first_name,
      last_name,
      email,
      password,
      role,
      is_active,
      created_at,
      interests,
      phone,
    });
    res.status(201).send({ message: "New Contract added", newContract });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllContract = async (req, res) => {
  try {
    const contract = await Contract.findAll();
    res.status(200).send({ contract });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getContractById = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await Contract.findByPk(id);
    res.status(200).send({ contract });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateContract = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      email,
      password,
      role,
      is_active,
      created_at,
      interests,
      phone,
    } = req.body;

    const contract = await Contract.update(
      {
        first_name,
        last_name,
        email,
        password,
        role,
        is_active,
        created_at,
        interests,
        phone,
      },
      { where: { id }, returning: true }
    );
    res.status(200).send({ contract: contract[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteContract = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await Contract.destroy({ where: { id } });
    res.status(200).send({ message: "O'chirildi", contract });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  createContract,
  getAllContract,
  getContractById,
  updateContract,
  deleteContract,
};
