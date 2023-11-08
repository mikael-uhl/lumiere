import express from "express";
import authRoutes from "./authRoutes.js";
import contentItemRoutes from "./contentItemRoutes.js";
import groupRoutes from "./groupRoutes.js";
import userRotes from "./userRoutes.js";
import sequelize from "../db/index.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/content", contentItemRoutes);
router.use("/groups", groupRoutes);
router.use("/users", userRotes);

router.get("/create-tables", async (req, res) => {
  try {
    await sequelize.sync({ alter: true });
    res.status(200).json({ message: "Tabelas criadas/atualizadas com sucesso" });
  } catch (error) {
    console.error("Erro ao criar tabelas:", error);
    res.status(500).json({ message: "Erro ao criar tabelas" });
  }
});

export default router;
