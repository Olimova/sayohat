const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Payment = sequelize.define("payment", {
    payment_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    payment_method:{
        type: DataTypes.ENUM("cash","credit_card"),
        allowNull: false,
    },
    payment_status:{
        type: DataTypes.ENUM("pending","completed","failed"),
        allowNull: false,
    },
    amount_paid:{
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
})
module.exports=Payment