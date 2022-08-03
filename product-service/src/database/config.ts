import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from "sequelize";
import * as pg from 'pg';

const HOST = process.env.HOST;
const DB_USER = process.env.DB_USER;
const PASSWORD = process.env.PASSWORD;
const DB = process.env.DB;

const sequelizeConnection = new Sequelize(DB, DB_USER, PASSWORD, {
  host: HOST,
  dialect: "postgres",
  dialectModule: pg,
  logging: false
});

export default sequelizeConnection;
