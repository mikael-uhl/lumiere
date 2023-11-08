import bcrypt from "bcrypt";
import { User, Group, GroupMember } from "../models/index.js";

export const createUser = async (req, res) => {
  const {
    first_name,
    last_name,
    username,
    email,
    date_of_birth,
    phone_number,
    profile_image_url,
    password,
  } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const userData = {
      first_name,
      last_name,
      username,
      email,
      date_of_birth,
      phone_number,
      profile_image_url,
      password_hash: passwordHash,
    };

    const user = await User.create(userData);

    const group = await Group.create();

    const groupMember = await GroupMember.create({
      group_id: group.group_id,
      user_id: user.user_id,
      permissions: "read-write",
    });

    const userWithoutPassword = user.toJSON();
    delete userWithoutPassword.password_hash;

    res.status(201).json({
      message: "Usuário criado com sucesso",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res
      .status(500)
      .json({ message: "Erro ao criar usuário", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password_hash"] },
    });
    res.json(users);
  } catch (error) {
    console.error("Erro ao buscar todos os usuários:", error);
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password_hash"] },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário por ID:", error);
    res.status(500).json({ message: "Erro ao buscar usuário por ID" });
  }
};

export const getGroupsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Group,
          through: GroupMember,
        },
      ],
      attributes: { exclude: ["password_hash"] },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.status(200).json(user.Groups);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const findByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ["password_hash"] },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error("Erro ao encontrar usuário por e-mail:", error);
    res.status(500).json({ message: "Erro ao encontrar usuário" });
  }
};

export const findByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({
      where: { username },
      attributes: { exclude: ["password_hash"] },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error("Erro ao encontrar usuário por nome de usuário:", error);
    res.status(500).json({ message: "Erro ao encontrar usuário" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  let updatedUserData = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (updatedUserData.password) {
      const passwordHash = await bcrypt.hash(updatedUserData.password, 10);
      let { password, ...userWithoutPassword } = updatedUserData;
      updatedUserData = { ...userWithoutPassword, password_hash: passwordHash };
    }

    await user.update(updatedUserData);

    const userWithoutPassword = user.toJSON();
    delete userWithoutPassword.password_hash;

    res.json({
      message: "Usuário atualizado com sucesso",
      userWithoutPassword,
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    await user.destroy();

    res.json({ message: "Usuário excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    res.status(500).json({ message: "Erro ao excluir usuário" });
  }
};
