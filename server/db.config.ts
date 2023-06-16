import { Sequelize } from "sequelize";



const config = {
    HOST: "localhost",
    PORT: 3306,
    USER: "root",
    PASSWORD: "root",
    DB: "mary_event",
};

export const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    port: config.PORT,
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});
