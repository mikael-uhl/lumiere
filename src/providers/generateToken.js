import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/env.js";

const secretKey = SECRET_KEY;

export function generateToken(user) {
  const token = jwt.sign({ ...user }, secretKey, {
    expiresIn: "1h",
  });

  return token;
}
