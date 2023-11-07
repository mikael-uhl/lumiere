import { Category } from "../models/Category.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error("Erro ao buscar todas as categorias:", error);
    res.status(500).json({ message: "Erro ao buscar categorias" });
  }
};
