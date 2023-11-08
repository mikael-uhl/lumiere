import express from "express";
import { groupController } from "../controllers/index.js";
import passport from "../config/passport.js";

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  groupController.getAllGroups
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  groupController.getGroupById
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  groupController.createGroup
);
router.post(
  "/:groupId/users/:userId/permissions/:permissions",
  passport.authenticate("jwt", { session: false }),
  groupController.addUserToGroup
);
router.delete(
  "/:groupId/users/:userId",
  passport.authenticate("jwt", { session: false }),
  groupController.addUserToGroup
);
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  groupController.updateGroup
);
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  groupController.deleteGroup
);

export default router;
