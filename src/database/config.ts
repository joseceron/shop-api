import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from "sequelize";

const HOST = process.env.HOST;
const DB_USER = process.env.DB_USER;
const PASSWORD = process.env.PASSWORD;
const DB = process.env.DB;

const sequelizeConnection = new Sequelize(DB, DB_USER, PASSWORD, {
  host: HOST,
  dialect: "postgres",
  logging: false
});

// sequelizeConnection
//   .authenticate()
//   .then(_ => {
//     console.log("Authenticated");
//   })
//   .catch(error => {
//     console.log("Error Authentication");
//     console.log(error);
//   });

export default sequelizeConnection;
