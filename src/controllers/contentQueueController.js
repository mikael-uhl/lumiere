import { ContentQueue } from "../models/index.js";

export const getAllContentQueues = async (req, res) => {
  try {
    const contentQueues = await ContentQueue.findAll();
    return res.json(contentQueues);
  } catch (error) {
    console.error("Erro ao buscar todas as filas de conteúdo:", error);
    return res.status(500).json({ error: "Erro ao buscar filas de conteúdo" });
  }
};
