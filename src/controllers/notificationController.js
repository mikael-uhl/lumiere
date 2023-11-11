import { Notification, User } from "../models/index.js";

export const createNotification = async (req, res) => {
  try {
    const { message, user_id } = req.body;
    const notification = await Notification.create({ message, user_id });

    return res.status(201).json(notification );
  } catch (error) {
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll();
    return res.json(notifications);
  } catch (error) {
    console.error("Erro ao buscar todos as notificações:", error);
    return res.status(500).json({ error: "Erro ao buscar notificações" });
  }
};

export const getNotificationById = async (req, res) => {
  const { notificationId } = req.params;

  try {
    const notification = await Notification.findByPk(notificationId);

    if (!notification) {
      return res.status(404).json({ error: "Notificação não encontrada" });
    }

    return res.status(200).json(notification);
  } catch (error) {
    console.error("Erro ao buscar notificação por ID:", error);
    return res.status(500).json({ error: "Erro ao buscar notificação por ID" });
  }
};

export const getNotificationByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Notification,
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.status(200).json(user.Notifications);
  } catch (error) {
    console.error("Erro ao buscar Notificações por usuário:", error);
    return res.status(500).json({ error: "Erro ao buscar Notificações por usuário" });
  }
};

export const updateNotification = async (req, res) => {
  const { notificationId } = req.params;
  let updatedNotificationData = req.body;

  try {
    const notification = await Notification.findByPk(notificationId);

    if (!notification) {
      return res.status(404).json({ error: "Notificação não encontrada" });
    }

    await notification.update(updatedNotificationData);

    return res.status(200).json({
      message: "Notificação atualizada com sucesso",
      notification,
    });
  } catch (error) {
    console.error("Erro ao atualizar notificação:", error);
    return res.status(500).json({ error: "Erro ao atualizar notificação" });
  }
};

export const deleteNotification = async (req, res) => {
  const { notificationId } = req.params;

  try {
    const notification = await Notification.findByPk(notificationId);
    if (notification) {
      await notification.destroy();
      return res.status(204).json({ message: "Notificação excluída com sucesso" });
    } else {
      return res.status(404).json({ error: "Notificação não encontrada" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};