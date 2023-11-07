import { Group, GroupMember, User } from "../models/index.js";

export const createGroup = async (req, res) => {
  try {
    const { group_name } = req.body;
    const group = await Group.create({ group_name });

    return res.status(201).json({ message: "Grupo criado com sucesso", group });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const addUserToGroup = async (req, res) => {
  const { groupId, userId } = req.params;

  try {
    const group = await Group.findByPk(groupId);
    const user = await User.findByPk(userId);

    if (!group || !user) {
      return res.status(404).json({ error: "Grupo ou usuário não encontrado" });
    }

    const groupMember = await GroupMember.create({
      group_id: groupId,
      user_id: userId,
    });

    return res.status(201).json(groupMember);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const removeUserFromGroup = async (req, res) => {
  const { groupId, userId } = req.params;

  try {
    const group = await Group.findByPk(groupId);
    const user = await User.findByPk(userId);

    if (!group || !user) {
      return res.status(404).json({ error: "Grupo ou usuário não encontrado" });
    }

    const groupMember = await GroupMember.findOne({
      where: { group_id: groupId, user_id: userId },
    });

    if (!groupMember) {
      return res.status(404).json({ error: "Usuário não encontrado no grupo" });
    }

    await groupMember.destroy();

    return res.status(200).json({ message: "Usuário removido do grupo com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.findAll({
      include: [
        {
          model: User,
          through: GroupMember,
          attributes: { exclude: ["password_hash"] },
        },
      ],
    });
    res.json(groups);
  } catch (error) {
    console.error("Erro ao buscar todos os grupos:", error);
    res.status(500).json({ message: "Erro ao buscar grupos" });
  }
};

export const getGroupById = async (req, res) => {
  const { id } = req.params;

  try {
    const group = await Group.findByPk(id, {
      include: [
        {
          model: User,
          through: GroupMember,
          attributes: { exclude: ["password_hash"] },
        }
      ]
    });

    if (!group) {
      return res.status(404).json({ message: "Grupo não encontrado" });
    }

    res.json(group);
  } catch (error) {
    console.error("Erro ao buscar grupo por ID:", error);
    res.status(500).json({ message: "Erro ao buscar grupo por ID" });
  }
};

export const updateGroup = async (req, res) => {
  const { id } = req.params;
  const { group_name } = req.body;

  try {
    const group = await Group.findByPk(id);
    if (group) {
      group.group_name = group_name;
      await group.save();
      return res.status(200).json(group);
    } else {
      return res.status(404).json({ error: "Grupo não encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const deleteGroup = async (req, res) => {
  const { id } = req.params;

  try {
    const group = await Group.findByPk(id);
    if (group) {
      await group.destroy();
      return res.status(204).send();
    } else {
      return res.status(404).json({ error: "Grupo não encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};
