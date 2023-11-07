import { ContentList } from "../models/ContentList.js";

export const getAllContentLists = async (req, res) => {
  try {
    const contentLists = await ContentList.findAll();
    res.json(contentLists);
  } catch (error) {
    console.error("Erro ao buscar todas as listas de conteúdo:", error);
    res.status(500).json({ message: "Erro ao buscar listas de conteúdo" });
  }
};
