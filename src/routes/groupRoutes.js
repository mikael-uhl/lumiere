import express from "express";
import { groupController, contentQueueController } from "../controllers/index.js";
import authenticationMiddleware from "../config/authenticationMiddleware.js";

const router = express.Router();

router.use(authenticationMiddleware);

router.get("/", groupController.getAllGroups);
router.get("/:groupId", groupController.getGroupById);
router.get("/:groupId/content-lists", groupController.getContentListsByGroup);
router.get("/:groupId/content-queues", groupController.getContentQueuesByGroup);
router.post("/:groupId/content-queues", contentQueueController.createContentQueue);
router.post("/", groupController.createGroup);
router.post(
  "/:groupId/users/:userId/permissions/:permissions",
  groupController.addUserToGroup
);
router.post("/:groupId/users/:userId", groupController.addUserToGroup);
router.put("/:groupId", groupController.updateGroup);
router.delete("/groupId", groupController.deleteGroup);

export default router;
