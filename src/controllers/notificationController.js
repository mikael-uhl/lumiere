import { Notification } from "../models/Notification.js";

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.json(notifications);
  } catch (error) {
    console.error("Erro ao buscar todos as notificações:", error);
    res.status(500).json({ message: "Erro ao buscar notificações" });
  }
};
