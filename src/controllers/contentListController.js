import { ContentItem, ContentList } from "../models/index.js";

export const getAllContentLists = async (req, res) => {
  try {
    const contentLists = await ContentList.findAll();
    return res.status(200).json(contentLists);
  } catch (error) {
    console.error("Erro ao buscar todas as listas de conteúdo:", error);
    return res.status(500).json({ error: "Erro ao buscar listas de conteúdo" });
  }
};

export const getContentListById = async (req, res) => {
  const { listId } = req.params;
  try {
    const contentList = await ContentList.findByPk(listId, {
      include: ContentItem,
    });
    return res.status(200).json(contentList);
  } catch (error) {
    console.error("Erro ao buscar lista de conteúdo:", error);
    return res.status(500).json({ error: "Erro ao buscar lista de conteúdo" });
  }
};

export const getContentItemsByList = async (req, res) => {
  try {
    const { listId } = req.params;
    const { order, orderDirection } = req.query;
    const defaultOrder = [["created_at", "DESC"]];
    const defaultOrderDirection = "ASC";
    const normalizedOrderDirection = orderDirection
      ? orderDirection.toUpperCase()
      : defaultOrderDirection;
    const orderOptions = order
      ? [[order, normalizedOrderDirection]]
      : defaultOrder;

    const list = await ContentList.findByPk(listId);

    if (!list) {
      return res
        .status(404)
        .json({ error: "Lista de conteúdo não encontrada" });
    }

    const contentItems = await ContentItem.findAll({
      where: {
        list_id: listId,
      },
      order: orderOptions,
    });

    return res.status(200).json(contentItems);
  } catch (error) {
    console.error("Erro ao buscar Itens de Conteúdo por lista:", error);
    return res.status(500).json({ error: "Erro ao buscar Itens de Conteúdo" });
  }
};
