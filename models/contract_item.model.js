const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Contract_item = sequelize.define("contract_item", {
    contract_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price_per_day:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    total_price:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
})

module.exports=Contract_item