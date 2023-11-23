import express from "express";
import { notificationController } from "../controllers/index.js";
import authenticationMiddleware from "../config/authenticationMiddleware.js";

const router = express.Router();

router.use(authenticationMiddleware);

router.post("/", notificationController.createNotification);
router.get("/", notificationController.getAllNotifications);
router.get("/:notificationId", notificationController.getNotificationById);
router.delete("/:notificationId", notificationController.deleteNotification);
router.get("/user/:userId", notificationController.getNotificationByUser);

export default router;
