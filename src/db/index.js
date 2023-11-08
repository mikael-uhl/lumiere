import { Sequelize } from "sequelize";
import {
  DATABASE_DIALECT,
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_USER,
} from "../config/env.js";

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  dialect: DATABASE_DIALECT,
});

export default sequelize;
