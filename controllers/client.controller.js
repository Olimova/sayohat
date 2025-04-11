const Client = require("../models/client.model");
const config = require("config");
const errorHandler = require("../helpers/error.handler");
const {clientValidation}=require("../validation/client.validation")
const bcrypt = require("bcrypt");
const jwtService = require("../services/jwt.service");
const mailService = require("../services/mail.service");
const refreshTokenSecret = config.get("jwt.client.refresh_key");


const createClient = async (req, res) => {
  try {
    const { error, value } = clientValidation(req.body);
    const {
      first_name,
      last_name,
      phone_number,
      email,
      password,
      refresh_token,
      otp,
      created_at,
      role
    } = value;
    const hashedPassword = await bcrypt.hash(password, 6);
    const newClient = await Client.create({
      first_name,
      last_name,
      phone_number,
      email,
      password: hashedPassword,
      refresh_token,
      otp,
      created_at,
      role,
    });
    res.status(201).send({ message: "New Client added", newClient });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllClient = async (req, res) => {
  try {
    const client = await Client.findAll();
    res.status(200).send({ client });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);
    res.status(200).send({ client });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateClient = async (req, res) => {
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
      role,
    } = req.body;

    const client = await Client.update(
      {
        first_name,
        last_name,
        phone_number,
        email,
        password,
        refresh_token,
        otp,
        created_at,
        role,
      },
      { where: { id }, returning: true }
    );
    res.status(200).send({ client: client[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.destroy({ where: { id } });
    res.status(200).send({ message: "O'chirildi", client });
  } catch (error) {
    errorHandler(error, res);
  }
};

const loginClient = async (req, res) => {
  try {
    const { email, password } = req.body;

    const client = await Client.findOne({ where:{email} });
    if (!client) {
      return res.status(400).send({ message: "Foydalanuvchi topilmadi" });
    }
    const validPassword = await bcrypt.compare(password, client.password);
    if (!validPassword)
      return res.status(400).send({ message: "Password noto'g'ri" });

    const payload = {
      id: client._id,
      email: client.email,
      role: client.role,
      is_creator: client.is_creator,
    };
    const tokens = jwtService.generateToken(payload);

    client.refresh_token = tokens.refreshToken;
    await client.save();

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

const logoutClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);
    if (!client) return res.status(404).json({ message: "Client topilmadi" });

    await client.update({ refreshToken: null });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const refreshTokenClient = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).send({ message: "refresh token topilmadi" });
    }
    const decode = await jwtService.verifyRefreshToken(refreshToken);
    const client = await Client.findOne({ refresh_token: refreshToken });
    if (!client) {
      return res
        .status(400)
        .send({ message: "Bunday tokenli foydalanuvchi topilmadi" });
    }

    const payload = {
      id: client._id,
      email: client.email,
      role: client.role,
    };
    const tokens = jwtService.generateToken(payload);

    client.refresh_token = tokens.refreshToken;
    await client.save();

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

    const client = await Client.findOne({ where:{email} });
    if (!client) return res.status(404).json({ message: "Client topilmadi" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    await Client.update({ otp }, { where: { id: client.id } });

    await mailService.sendOtpMail(email, otp);

    res.status(200).json({ message: "OTP Emailga qo'shildi" });
  } catch (error) {
    errorHandler(error, res);
  }
}

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const client = await Client.findOne({where: {email} });
    if (!client) return res.status(404).json({ message: "Client topilmadi" });

    if (client.otp === String(otp)) {
      return res.status(200).json({ message: "OTP tasdiqlandi" });
    }else{
      return res.status(400).json({ message: "OTP yaroqsiz" });
    }
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  createClient,
  getAllClient,
  getClientById,
  updateClient,
  deleteClient,
  loginClient,
  logoutClient,
  refreshTokenClient,
  sendOtp,
  verifyOtp
};
