import { GroupMember } from "../models/GroupMember.js";

export const getAllGroupMembers = async (req, res) => {
  try {
    const groupMembers = await GroupMember.findAll();
    res.json(groupMembers);
  } catch (error) {
    console.error("Erro ao buscar todos os membros de grupos:", error);
    res.status(500).json({ message: "Erro ao buscar membros de grupos" });
  }
};
