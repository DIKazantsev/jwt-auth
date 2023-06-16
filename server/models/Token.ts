import { DataTypes } from "sequelize";
import { sequelize } from "../db.config";
import { User } from "./User";




export const Token = sequelize.define("token", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, {
    freezeTableName: true,

});


