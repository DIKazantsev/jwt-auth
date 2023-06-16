import { DataTypes } from "sequelize";
import { sequelize } from "../db.config";
import { Token } from "./Token";




export const User = sequelize.define("user", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isActivated: {
        type: DataTypes.BOOLEAN
    },
    activationLink: {
        type: DataTypes.STRING
    },

}, {
    freezeTableName: true,

});
