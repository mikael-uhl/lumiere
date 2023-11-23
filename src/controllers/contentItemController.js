import { ContentItem } from "../models/index.js";

export const getAllContentItems = async (req, res) => {
  try {
    const contentItems = await ContentItem.findAll();
    return res.status(200).json(contentItems);
  } catch (error) {
    console.error("Erro ao buscar todos os itens de conteúdo:", error);
    return res.status(500).json({ error: "Erro ao buscar itens de conteúdo" });
  }
};

export const getContentItemById = async (req, res) => {
  const { itemId } = req.params;

  try {
    const contentItem = await ContentItem.findByPk(itemId);

    if (!contentItem) {
      return res.status(404).json({ error: "Item de conteúdo não encontrada" });
    }

    return res.status(200).json(contentItem);
  } catch (error) {
    console.error("Erro ao buscar item de conteúdo por ID:", error);
    return res
      .status(500)
      .json({ error: "Erro ao buscar item de conteúdo por ID" });
  }
};

export const getItemsInList = async (req, res) => {
  const { listId } = req.params;
  try {
    const items = await ContentItem.findAll({
      where: { list_id: listId },
    });
    return res.status(200).json(items);
  } catch (error) {
    console.error("Erro ao buscar itens na lista:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const createContentItem = async (req, res) => {
  const { title, original_title, year, genre, completed, category_id } =
    req.body;
  try {
    const contentItem = await ContentItem.create({
      title,
      original_title,
      year,
      genre,
      completed,
      category_id,
    });
    return res.status(201).json(contentItem);
  } catch (error) {
    console.error("Erro ao criar item de conteúdo:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const updateContentItem = async (req, res) => {
  const { itemId } = req.params;
  let updatedContentItemData = req.body;

  try {
    const contentItem = await ContentItem.findByPk(itemId);

    if (!contentItem) {
      return res.status(404).json({ error: "Item de conteúdo não encontrado" });
    }

    await contentItem.update(updatedContentItemData);

    return res.status(200).json({
      message: "Item de conteúdo atualizado com sucesso",
      contentItem,
    });
  } catch (error) {
    console.error("Erro ao atualizar item de conteúdo:", error);
    return res.status(500).json({ error: "Erro ao atualizar item de conteúdo" });
  }
};

export const deleteContentItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    const contentItem = await ContentItem.findByPk(itemId);

    if (!contentItem) {
      return res.status(404).json({ error: "Item de conteúdo não encontrado" });
    }

    await contentItem.destroy();
    return res
      .status(204)
      .json({ message: "Item de conteúdo excluído com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};
