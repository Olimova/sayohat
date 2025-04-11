const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Client_passport = sequelize.define("client_passport", {
  client_id: {
    type: DataTypes.STRING,
  },
  passport_series: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passport_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  issued_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  gender:{
    type:DataTypes.ENUM("male","female"),
    allowNull:false,
  }
});

module.exports=Client_passport