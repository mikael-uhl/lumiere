import { ContentList } from "../models/index.js";

export const getAllContentLists = async (req, res) => {
  try {
    const contentLists = await ContentList.findAll();
    return res.status(200).json(contentLists);
  } catch (error) {
    console.error("Erro ao buscar todas as listas de conteúdo:", error);
    return res.status(500).json({ error: "Erro ao buscar listas de conteúdo" });
  }
};
