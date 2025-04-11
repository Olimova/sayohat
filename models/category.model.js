const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Comment = sequelize.define("comment", {
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports=Comment