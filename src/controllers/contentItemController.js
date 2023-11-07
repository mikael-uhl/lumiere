import { ContentItem } from "../models/ContentItem.js";

export const getAllContentItems = async (req, res) => {
  try {
    const contentItems = await ContentItem.findAll();
    res.json(contentItems);
  } catch (error) {
    console.error("Erro ao buscar todos os itens de conteúdo:", error);
    res.status(500).json({ message: "Erro ao buscar itens de conteúdo" });
  }
};
