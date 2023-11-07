import express from "express";
import { userController } from "../controllers/index.js";
import passport from "../config/passport.js";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.get(
  "/:id/groups",
  passport.authenticate("jwt", { session: false }),
  userController.getGroupsByUser
);
router.post("/", userController.createUser);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  userController.updateUser
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  userController.deleteUser
);
router.get("/email/:email", userController.findByEmail);
router.get("/username/:username", userController.findByUsername);

export default router;
