import bcrypt from "bcrypt";
import { User } from "../models/index.js";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/env.js";

const secretKey = SECRET_KEY;

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (passwordMatch) {
      const userWithoutPassword = user.toJSON();
      delete userWithoutPassword.password_hash;

      const token = jwt.sign({ user_id: user.user_id }, secretKey, {
        expiresIn: "1h",
      });

      return res.status(200).json({
        message: "Login bem-sucedido",
        token,
        user: userWithoutPassword,
      });
    } else {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res
      .status(500)
      .json({ error: "Erro ao fazer login", error: error.message });
  }
};
