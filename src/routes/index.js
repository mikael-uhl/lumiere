import express from "express";
import authRoutes from "../routes/authRoutes.js";
import groupRoutes from "../routes/groupRoutes.js";
import userRotes from "../routes/userRoutes.js";
import sequelize from "../../db/index.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/groups", groupRoutes);
router.use("/users", userRotes);

router.get("/create-tables", async (req, res) => {
  try {
    await sequelize.sync({ alter: true });
    res.json({ message: "Tabelas criadas com sucesso" });
  } catch (error) {
    console.error("Erro ao criar tabelas:", error);
    res.status(500).json({ message: "Erro ao criar tabelas" });
  }
});


export default router;