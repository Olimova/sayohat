const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Contract_status = sequelize.define("contract_status", {
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports=Contract_status