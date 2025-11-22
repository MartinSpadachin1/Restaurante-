import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const logHabilitado = process.env.LOG;

const sequelize = new Sequelize({
    dialect: "sqlite",
    logging: (logHabilitado === "true") ? console.log : false,
    storage: "./data/TP_3K2_BD.db" //REVISAR
});

export default sequelize;
