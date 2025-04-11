const Owner = require("../models/owner.model");
const config = require("config");
const errorHandler = require("../helpers/error.handler");
const { ownerValidation } = require("../validation/owner.validation");
const {sendOtpMail }=require("../services/mail.service");
const mailService = require("../services/mail.service");
const jwtService = require("../services/jwt.service");
const bcrypt = require("bcrypt");


const createOwner = async (req, res) => {
  try {
    const { error, value } = ownerValidation(req.body);
    const {
      first_name,
      last_name,
      phone_number,
      email,
      password,
      refresh_token,
      otp,
      created_at,
      updated_at,role
    } = value;
    const hashedPassword = await bcrypt.hash(password, 6);
    const newOwner = await Owner.create({
      first_name,
      last_name,
      phone_number,
      email,
      password: hashedPassword,
      refresh_token,
      otp,
      created_at,
      updated_at,
      role,
    });
    res.status(201).send({ message: "New Owner added", newOwner });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllOwner = async (req, res) => {
  try {
    const owner = await Owner.findAll();
    res.status(200).send({ owner });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getOwnerById = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = await Owner.findByPk(id);
    res.status(200).send({ owner });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      phone_number,
      email,
      password,
      refresh_token,
      otp,
      created_at,
      updated_at,
      role,
    } = req.body;

    const owner = await Owner.update(
      {
        first_name,
        last_name,
        phone_number,
        email,
        password,
        refresh_token,
        otp,
        created_at,
        updated_at,
        role,
      },
      { where: { id }, returning: true }
    );
    res.status(200).send({ owner: owner[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = await Owner.destroy({ where: { id } });
    res.status(200).send({ message: "O'chirildi", owner });
  } catch (error) {
    errorHandler(error, res);
  }
};


const loginOwner = async (req, res) => {
  try {
    const { email, password } = req.body;

    const owner = await Owner.findOne({ email });
    if (!owner) {
      return res.status(400).send({ message: "Foydalanuvchi topilmadi" });
    }
    const validPassword = await bcrypt.compare(password, owner.password);
    if (!validPassword)
      return res.status(400).send({ message: "Password noto'g'ri" });

    const payload = {
      id: owner._id,
      email: owner.email,
      role: owner.role,
      is_creator: owner.is_creator,
    };
    const tokens = jwtService.generateToken(payload);

    owner.refresh_token = tokens.refreshToken;
    await owner.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.send({
      message: "tizimga xush kelibsiz",
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const logoutOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = await Owner.findByPk(id);
    if (!owner) return res.status(404).json({ message: "Owner topilmadi" });

    await owner.update({ refreshToken: null });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).send({ message: "refresh token topilmadi" });
    }
    const decode = await jwtService.verifyRefreshToken(refreshToken);
    const owner = await Owner.findOne({ refresh_token: refreshToken });
    if (!owner) {
      return res
        .status(400)
        .send({ message: "Bunday tokenli foydalanuvchi topilmadi" });
    }

    const payload = {
      id: owner._id,
      email: owner.email,
      role: owner.role,
    };
    const tokens = jwtService.generateToken(payload);

    owner.refresh_token = tokens.refreshToken;
    await owner.save();

    res.status(200).json({
      message: "Token refreshed",
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const owner = await Owner.findOne({ email });
    if (!owner) return res.status(404).json({ message: "Owner topilmadi" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    await Owner.update({ otp }, { where: { id: owner.id } });

    await mailService.sendOtpMail(email, otp);

    res.status(200).json({ message: "OTP Emailga qo'shildi" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const owner = await Owner.findOne({ where:{email} });
    if (!owner) return res.status(404).json({ message: "Owner topilmadi" });

    if (owner.otp === String(otp)) {
      return res.status(400).json({ message: "OTP tasdiqlandi" });
    } else {
      return res.status(200).json({ message: "OTP yaroqsiz" });
    }
  } catch (error) {
    errorHandler(error, res);
  }
};



module.exports = {
  createOwner,
  getAllOwner,
  getOwnerById,
  updateOwner,
  deleteOwner,
  loginOwner,
  logoutOwner,
  refreshToken,
  sendOtp,verifyOtp
};
