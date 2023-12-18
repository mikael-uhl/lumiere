import express from "express";
import { followerController } from "../controllers/index.js";
import authenticationMiddleware from "../config/authenticationMiddleware.js";

const router = express.Router();

router.use(authenticationMiddleware);

router.get("/:userId", followerController.getAllFollowedUsersById);

export default router;
