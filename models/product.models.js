const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Product = sequelize.define("product", {
   name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    category_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price_per_day:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rental_status_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    owner_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_at:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
   } 
)

module.exports=Product