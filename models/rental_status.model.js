const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Rental_status = sequelize.define("rental_status", {
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports=Rental_status