require('dotenv').config();

import express from "express";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { User } from "./models/User";
import { sequelize } from "./db.config";
import { Token } from "./models/Token";
import { addRelations } from "./models/relations";
import { router } from "./router";
const errorMiddleware = require('./middlewares/errorMiddleware');



const PORT = process.env.PORT || 2000;


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL

}));
app.use('/api', router);
app.use(errorMiddleware);




const start = async () => {
    try {

        await sequelize.authenticate();
        addRelations();
        app.listen(PORT, () => {
            console.log(`Server started on port = ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}


start();