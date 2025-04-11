const Admin = require("../models/admin.model");
const config = require("config");
const errorHandler = require("../helpers/error.handler");
const { adminValidation } = require("../validation/admin.validation");
const {sendOtpMail}=require("../services/mail.service");
const mailService = require("../services/mail.service");
const errorHandling = require("../middleware/error/error.handling");
const bcrypt = require('bcrypt');
const jwtService = require('../services/jwt.service');
const refreshTokenSecret = config.get("jwt.admin.refresh_key");


const createAdmin = async (req, res) => {
  try {
    const { error, value } = adminValidation(req.body);
    const {
      name,
      email,
      first_name,
      last_name,
      password,
      refresh_token,
      is_active,
      is_creator,
      role,
    } = value;
    const hashedPassword = await bcrypt.hash(password, 6);
    const admin = await Admin.create({
      name,
      email,
      first_name,
      last_name,
      password: hashedPassword,
      refresh_token,
      is_active,
      is_creator,
      role,
    });
    res.status(201).send({ message: "New admin added", admin });
  } catch (error) {
      errorHandler(error, res);
  }
};

const getAllAdmin = async (req, res) => {
  try {
    const admin = await Admin.findAll();
    res.status(200).send({ message: "All admin", admin });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id);
    res.status(200).send({ admin });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      first_name,
      last_name,
      password,
      refresh_token,
      is_active,
      is_creator,
      role,
    } = req.body;

    const admin = await Admin.update(
      {
        name,
        email,
        first_name,
        last_name,
        password,
        refresh_token,
        is_active,
        is_creator,
        role,
      },
      { where: { id }, returning: true }
    );
    res.status(200).send({ admin: admin[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.destroy({ where: { id } });
    res.status(200).send({ message: "O'chirildi", admin });
  } catch (error) {
    errorHandler(error, res);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email }});
    if (!admin) {
      return res.status(400).send({ message: "Foydalanuvchi topilmadi" });
    }
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword)
      return res
        .status(400)
        .send({ message: "Password noto'g'ri" });

    const payload = {
      id: admin._id,
      email: admin.email,
      role: admin.role,
      is_creator: admin.is_creator,
    };
    const tokens = jwtService.generateToken(payload);

    admin.refresh_token = tokens.refreshToken;
    await admin.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7*24*60*60*1000 
    });

    res.send({
      message: "tizimga xush kelibsiz",
      accessToken: tokens.accessToken,
      refreshToken:tokens.refreshToken
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const logoutAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id);
    if (!admin) return res.status(404).json({ message: "Admin topilmadi" });

    await admin.update({ refreshToken: null });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const refreshTokenAdmin = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "refresh token topilmadi" });
    }
    
    jwtService.verifyRefreshToken(refreshToken,refreshTokenSecret, (err,decoded ) => {
      if (err) {
        return res.status(403).send({ message: "Token muddati tugagan" });
      }
    });
    
    const admin = await Admin.findOne({ refresh_token: refreshToken });
    if (!admin) {
      return res
        .status(400)
        .send({ message: "Bunday tokenli foydalanuvchi topilmadi" });
    }

    const payload = {
      id: admin._id,
      email: admin.email,
      role: admin.role,
    };
    const tokens = jwtService.generateToken(payload);

    admin.refresh_token = tokens.refreshToken;
    await admin.save();

    res.status(200).json({
      message: "Token refreshed",
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  createAdmin,
  getAllAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
  logoutAdmin,
  refreshTokenAdmin
};
