import express from "express";
import { contentListController } from "../controllers/index.js";
import authenticationMiddleware from "../config/authenticationMiddleware.js";

const router = express.Router();

router.use(authenticationMiddleware);

router.get("/", contentListController.getAllContentLists);

router.get("/:listId", contentListController.getContentListById);

router.get("/:listId/content-items", contentListController.getContentItemsByList);

export default router;
