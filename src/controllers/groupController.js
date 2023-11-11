import {
  ContentItem,
  ContentList,
  ContentQueue,
  Group,
  GroupMember,
  User,
} from "../models/index.js";

export const createGroup = async (req, res) => {
  try {
    const { group_name } = req.body;
    const group = await Group.create({ group_name });
    const contentList = await ContentList.create({ list_name: "Lista Padrão" });
    await group.addContentList(contentList);

    return res.status(201).json(group);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const addUserToGroup = async (req, res) => {
  const { groupId, userId } = req.params;
  const { permissions } = req.body;

  try {
    const group = await Group.findByPk(groupId);
    const user = await User.findByPk(userId);

    if (!group || !user) {
      return res.status(404).json({ error: "Grupo ou usuário não encontrado" });
    }

    if (!permissions || !["read", "read-write"].includes(permissions)) {
      return res.status(400).json({
        error:
          "O campo 'permissions' é obrigatório e deve ser 'read' ou 'read-write'.",
      });
    }

    const groupMember = await GroupMember.create({
      group_id: groupId,
      user_id: userId,
      permissions,
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

    return res
      .status(200)
      .json({ message: "Usuário removido do grupo com sucesso" });
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
        {
          model: ContentList,
          include: ContentItem,
        },
        {
          model: ContentQueue,
          include: ContentItem,
        },
      ],
    });
    /* const groupsWithMultipleUsers = groups.filter(
      (group) => group.Users.length > 1
    ); */
    return res.status(200).json(groups);
  } catch (error) {
    console.error("Erro ao buscar todos os grupos:", error);
    return res.status(500).json({ error: "Erro ao buscar grupos" });
  }
};

export const getGroupById = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await Group.findByPk(groupId, {
      include: [
        {
          model: User,
          through: GroupMember,
          attributes: { exclude: ["password_hash"] },
        },
        {
          model: ContentList,
          include: ContentItem,
        },
        {
          model: ContentQueue,
          include: ContentItem,
        },
      ],
    });

    if (!group) {
      return res.status(404).json({ error: "Grupo não encontrado" });
    }

    return res.status(200).json(group);
  } catch (error) {
    console.error("Erro ao buscar grupo por ID:", error);
    return res.status(500).json({ error: "Erro ao buscar grupo por ID" });
  }
};

export const getContentListsByGroup = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await Group.findByPk(groupId, {
      include: [
        {
          model: ContentList,
          include: ContentItem,
        },
      ],
    });

    if (!group) {
      return res.status(404).json({ error: "Grupo não encontrado" });
    }

    return res.status(200).json(group.ContentLists);
  } catch (error) {
    console.error("Erro ao buscar Listas de Conteúdo por grupo:", error);
    return res.status(500).json({ error: "Erro ao buscar Listas de Conteúdo" });
  }
};

export const getContentQueuesByGroup = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await Group.findByPk(groupId, {
      include: [
        {
          model: ContentQueue,
          include: ContentItem,
        },
      ],
    });

    if (!group) {
      return res.status(404).json({ error: "Grupo não encontrado" });
    }

    return res.status(200).json(group.ContentQueues);
  } catch (error) {
    console.error("Erro ao buscar Filas de Conteúdo por grupo:", error);
    return res.status(500).json({ error: "Erro ao buscar Filas de Conteúdo" });
  }
};

export const updateGroup = async (req, res) => {
  const { groupId } = req.params;
  const { group_name } = req.body;

  try {
    const group = await Group.findByPk(groupId);
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
  const { groupId } = req.params;

  try {
    const group = await Group.findByPk(groupId);
    if (group) {
      await group.destroy();
      return res.status(204).json({ message: "Grupo excluído com sucesso" });
    } else {
      return res.status(404).json({ error: "Grupo não encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};
