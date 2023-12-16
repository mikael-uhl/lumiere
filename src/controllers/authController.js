import bcrypt from "bcrypt";
import { RefreshToken, User } from "../models/index.js";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/env.js";
import { generateRefreshToken } from "../providers/generateRefreshToken.js";
import dayjs from "dayjs";

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

      const token = jwt.sign({ ...userWithoutPassword }, secretKey, {
        expiresIn: "1h",
      });

      await RefreshToken.destroy({
        where: {
          user_id: user.user_id,
        },
      });

      const refreshToken = await generateRefreshToken(user.user_id);

      return res.status(200).json({
        token,
        user: userWithoutPassword,
        refreshToken,
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

export const refreshToken = async (req, res) => {
  const { refreshTokenId } = req.body;

  try {
    let refreshToken = await RefreshToken.findOne({
      where: {
        refresh_token_id: refreshTokenId,
      },
    });

    if (!refreshToken) {
      throw new Error("Refresh Token Inválido!");
    }

    const userWithoutPassword = await User.findOne({
      where: { user_id: refreshToken.user_id },
      attributes: { exclude: ["password_hash"] },
    });

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expires_in)
    );

    if (refreshTokenExpired) {
      await RefreshToken.destroy({
        where: {
          user_id: userWithoutPassword.user_id,
        },
      });

      const newRefreshToken = await generateRefreshToken(
        userWithoutPassword.user_id
      );
      refreshToken = newRefreshToken;
    }

    const token = jwt.sign({ ...userWithoutPassword }, secretKey, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      token,
      user: userWithoutPassword,
      refreshToken,
    });
  } catch (error) {
    console.error("Erro ao renovar token:", error);
    res
      .status(500)
      .json({ error: "Erro ao renovar token", error: error.message });
  }
};
