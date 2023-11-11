import { GroupMember } from "../models/index.js";

export const getAllGroupMembers = async (req, res) => {
  try {
    const groupMembers = await GroupMember.findAll();
    return res.status(200).json(groupMembers);
  } catch (error) {
    console.error("Erro ao buscar todos os membros de grupos:", error);
    return res.status(500).json({ error: "Erro ao buscar membros de grupos" });
  }
};
