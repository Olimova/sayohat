const Payment = require("../models/payment.model");
const db = require("../config/db");
const errorHandler = require("../helpers/error.handler");
const { paymentValidation } = require("../validation/payment.validation");

const createPayment = async (req, res) => {
  try {
    const { error, value } = paymentValidation(req.body);
    const {
      payment_date,
      amount,
      payment_method,
      payment_status,
      amount_paid,
    } = value;
    const newUser = await Payment.create({
      payment_date,
      amount,
      payment_method,
      payment_status,
      amount_paid,
    });
    res.status(201).send({ message: "New User added", newUser });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllPayment = async (req, res) => {
  try {
    const payment = await Payment.findAll();
    res.status(200).send({ payment });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);
    res.status(200).send({ payment });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      payment_date,
      amount,
      payment_method,
      payment_status,
      amount_paid,
    } = req.body;

    const user = await Payment.update(
      { payment_date, amount, payment_method, payment_status, amount_paid },
      { where: { id }, returning: true }
    );
    res.status(200).send({ user: user[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Payment.destroy({ where: { id } });
    res.status(200).send({ message: "O'chirildi", user });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  createPayment,
  getAllPayment,
  getPaymentById,
  updatePayment,
  deletePayment,
};
