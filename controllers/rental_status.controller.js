const RentalStatus = require("../models/rental_status.model");
const db = require("../config/db");
const errorHandler = require("../helpers/error.handler");
const { rentalStatusValidation } = require("../validation/rental_status.validation");

const createRentalStatus = async (req, res) => {
  try {
    const { error, value } = rentalStatusValidation(req.body);
    const { name,description } = value;
    const newUser = await RentalStatus.create({
      name,
      description,
    });
    res.status(201).send({ message: "New User added", newUser });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllRentalStatus = async (req, res) => {
  try {
    const rentalstatus = await RentalStatus.findAll();
    res.status(200).send({ rentalstatus });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getRentalStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const rentalstatus = await RentalStatus.findByPk(id);
    res.status(200).send({ rentalstatus });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateRentalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const user = await RentalStatus.update(
      { name, description },
      { where: { id }, returning: true }
    );
    res.status(200).send({ user: user[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteRentalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await RentalStatus.destroy({ where: { id } });
    res.status(200).send({ message: "O'chirildi", user });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  createRentalStatus,
  getAllRentalStatus,
  getRentalStatusById,
  updateRentalStatus,
  deleteRentalStatus,
};
