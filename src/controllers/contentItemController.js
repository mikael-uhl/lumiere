import { ContentItem } from "../models/ContentItem.js";

export const getAllContentItems = async (req, res) => {
  try {
    const contentItems = await ContentItem.findAll();
    res.status(200).json(contentItems);
  } catch (error) {
    console.error("Erro ao buscar todos os itens de conteúdo:", error);
    res.status(500).json({ message: "Erro ao buscar itens de conteúdo" });
  }
};

export const getItemsInList = async (req, res) => {
  const { listId } = req.params;
  try {
    const items = await ContentItem.findAll({
      where: { list_id: listId },
    });
    res.status(200).json(items);
  } catch (error) {
    console.error("Erro ao buscar itens na lista:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const createContentItem = async (req, res) => {
  const { title, original_title, year, genre, completed, category_id } = req.body;
  try {
    const contentItem = await ContentItem.create({
      title,
      original_title,
      year,
      genre,
      completed,
      category_id,
    });
    res.status(201).json(contentItem);
  } catch (error) {
    console.error("Erro ao criar item de conteúdo:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
