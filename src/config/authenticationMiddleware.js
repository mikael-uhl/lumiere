import pkg from "jsonwebtoken";
const { verify, decode } = pkg;
import { User } from "../models/index.js";
import { SECRET_KEY } from "./env.js";

const secretKey = SECRET_KEY;

const authenticationMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ error: "Token de autenticação não foi fornecido" });
  }

  const [typeToken, accessToken] = token.split(" ");

  try {
    verify(accessToken, secretKey);

    const { user_id } = decode(accessToken);

    const user = await User.findByPk(user_id, {
      attributes: { exclude: ["password_hash"] },
    });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Usuário não existente. Faça login novamente." });
    }

    req.authenticatedUserId = user_id;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Acesso não autorizado." });
  }
};

export default authenticationMiddleware;
