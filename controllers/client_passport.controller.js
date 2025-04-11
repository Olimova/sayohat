const ClientPassport = require("../models/client_passport.model");
const db = require("../config/db");
const errorHandler = require("../helpers/error.handler");
const { client_passportValidation } = require("../validation/client_passport.validation");

const createClient_passport = async (req, res) => {
  try {
    const { error, value } = client_passportValidation(req.body);
    const { passport_series, passport_number, issued_date, gender } = value;
    const newUser = await ClientPassport.create({
      passport_series,
      passport_number,
      issued_date,
      gender,
    });
    res.status(201).send({ message: "New User added", newUser });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllClient_passport = async (req, res) => {
  try {
    const clientpassport = await ClientPassport.findAll();
    res.status(200).send({ clientpassport });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getClient_passportById = async (req, res) => {
  try {
    const { id } = req.params;
    const clientpassport = await ClientPassport.findByPk(id);
    res.status(200).send({ clientpassport });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateClient_passport = async (req, res) => {
  try {
    const { id } = req.params;
    const { passport_series, passport_number, issued_date, gender } = req.body;

    const user = await ClientPassport.update(
      { passport_series, passport_number, issued_date, gender },
      { where: { id }, returning: true }
    );
    res.status(200).send({ user: user[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteClient_passport = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await ClientPassport.destroy({ where: { id } });
    res.status(200).send({ message: "O'chirildi", user });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  createClient_passport,
  getAllClient_passport,
  getClient_passportById,
  updateClient_passport,
  deleteClient_passport,
};
