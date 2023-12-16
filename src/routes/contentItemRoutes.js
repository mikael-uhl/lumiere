import express from "express";
import { contentItemController } from "../controllers/index.js";
import authenticationMiddleware from "../config/authenticationMiddleware.js";

const router = express.Router();

router.use(authenticationMiddleware);

router.get(
  "/",
  contentItemController.getAllContentItems
);
router.get(
  "/:itemId",
  contentItemController.getContentItemById
);
router.put(
  "/:itemId",
  contentItemController.updateContentItem
);
router.delete(
  "/:listId",
  contentItemController.deleteContentItem
);
router.post(
  "/",
  contentItemController.createContentItem
);
router.post(
  "/:",
  contentItemController.createContentItem
);

export default router;
