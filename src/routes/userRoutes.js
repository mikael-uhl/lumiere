import express from "express";
import { userController } from "../controllers/index.js";
import authenticationMiddleware from "../config/authenticationMiddleware.js";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.get(
  "/:userId/groups",
  authenticationMiddleware,
  userController.getGroupsByUser
);
router.post("/", userController.createUser);
router.put("/:id", authenticationMiddleware, userController.updateUser);
router.delete("/:id", authenticationMiddleware, userController.deleteUser);
router.get("/email/:email", userController.findByEmail);
router.get("/username/:username", userController.findByUsername);

export default router;
