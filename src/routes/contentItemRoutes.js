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
  "/:listId",
  contentItemController.getItemsInList
);
router.post(
  "/",
  contentItemController.createContentItem
);

export default router;
