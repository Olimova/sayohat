const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Contract = sequelize.define("contract", {
    contract_date:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    document_url:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    owner_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    client_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_at:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    start_date:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    condition:{
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports=Contract