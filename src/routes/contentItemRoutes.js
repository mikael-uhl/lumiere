import express from "express";
import { contentItemController } from "../controllers/index.js";
import passport from "../config/passport.js";

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  contentItemController.getAllContentItems
);
router.get(
  "/:listId",
  passport.authenticate("jwt", { session: false }),
  contentItemController.getItemsInList
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  contentItemController.createContentItem
);

export default router;
