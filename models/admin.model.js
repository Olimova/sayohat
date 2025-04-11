const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
  const Admin = sequelize.define("Admin", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    first_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    is_creator:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    role:{
        type: DataTypes.ENUM('admin','superadmin'),
        defaultValue: 'admin',
    }
  });


  module.exports=Admin
