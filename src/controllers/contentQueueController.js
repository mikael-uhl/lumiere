import { ContentQueue } from "../models/ContentQueue.js";

export const getAllContentQueues = async (req, res) => {
  try {
    const contentQueues = await ContentQueue.findAll();
    res.json(contentQueues);
  } catch (error) {
    console.error("Erro ao buscar todas as filas de conteúdo:", error);
    res.status(500).json({ message: "Erro ao buscar filas de conteúdo" });
  }
};
