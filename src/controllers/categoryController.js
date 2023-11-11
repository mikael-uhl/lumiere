import { Category } from "../models/index.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json(categories);
  } catch (error) {
    console.error("Erro ao buscar todas as categorias:", error);
    return res.status(500).json({ error: "Erro ao buscar categorias" });
  }
};
