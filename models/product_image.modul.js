const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Product_image = sequelize.define("product_image", {
    product_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image_url:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_main:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    uploaded_at:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
})

module.exports=Product_image