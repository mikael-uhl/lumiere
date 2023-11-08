import dotenv from "dotenv";
dotenv.config();

export const {
  DATABASE_DIALECT,
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_USER,
  PORT,
  SECRET_KEY,
} = process.env;
