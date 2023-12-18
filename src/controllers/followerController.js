import { Follower, User } from "../models/index.js";

export const getAllFollowersById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      include: [
        {
          model: User,
          as: "Followers",
          attributes: { exclude: ["password_hash"] },
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado!" });
    }

    return res.status(200).json(user.Followers);
  } catch (error) {
    console.error("Erro ao buscar todos os seguidores:", error);
    return res.status(500).json({ error: "Erro ao buscar seguidores" });
  }
};

export const getAllFollowedUsersById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      include: [
        {
          model: User,
          as: "Following",
          attributes: { exclude: ["password_hash"] },
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado!" });
    }

    return res.status(200).json(user.Following);
  } catch (error) {
    console.error("Erro ao buscar todos os seguidores:", error);
    return res.status(500).json({ error: "Erro ao buscar seguidores" });
  }
};

export const followUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { authenticatedUserId } = req;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ eror: "Usuário não encontrado!" });
    }

    const follower = await Follower.create({
      follower_id: authenticatedUserId,
      following_id: userId,
    });

    return res.status(200).json({ message: "Usuário seguido com sucesso!" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao seguir usuário!" });
  }
};

export const unFollowUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { authenticatedUserId } = req;
    const following = await User.findByPk(userId);

    if (!following) {
      return res.status(404).json({ eror: "Usuário não encontrado!" });
    }

    const follower = await Follower.findOne({
      where: {
        follower_id: authenticatedUserId,
        following_id: userId,
      }
    });

    if (!follower) {
      return res.status(404).json({error: "Você não seguia esse usuário!"});
    }

    await follower.destroy();

    return res.status(200).json({ message: "Usuário não mais seguido!" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao deixar de seguir usuário!" });
  }
};
