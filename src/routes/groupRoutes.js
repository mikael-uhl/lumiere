import express from "express";
import { groupController } from "../controllers/index.js";
import passport from "../config/passport.js";

const router = express.Router();

router.get("/", groupController.getAllGroups);
router.get("/:id", groupController.getGroupById);
router.post("/", groupController.createGroup);
router.post("/:groupId/users/:userId", groupController.addUserToGroup);
router.delete("/:groupId/users/:userId", groupController.addUserToGroup);
router.put("/", passport.authenticate('jwt', { session: false }), groupController.updateGroup);
router.delete("/", groupController.deleteGroup);

export default router;
