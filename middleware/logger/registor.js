const bcrypt = require("bcrypt");
const Client = require("../models/Client");

const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const existing = await Client.findOne({ email });
    if (existing) {
      return res.status(400).send({ message: "Email band" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const client = new Client({ email, password: hashedPassword, role });
    await client.save();

    res.status(201).send({ message: "Ro'yxatdan muvaffaqiyatli o'tildi" });
  } catch (error) {
    res.status(500).send({ message: "Serverda xatolik" });
  }
};

module.exports = register;
