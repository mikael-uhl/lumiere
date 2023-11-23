import express from "express";
import { pictureController } from "../controllers/index.js";
import authenticationMiddleware from "../config/authenticationMiddleware.js";
import upload from "../config/multer.js";

const router = express.Router();
router.use(authenticationMiddleware);

router.post("/upload", upload.single("file"), pictureController.uploadPicture);
router.post("/add-url", pictureController.addImageUrl);
router.get("/", pictureController.getAllPictures);
router.get("/:pictureId", pictureController.getPictureById);
router.delete("/:pictureId", pictureController.deletePicture);
router.post(
  "/profile-image/upload/:userId",
  upload.single("file"),
  pictureController.uploadProfileImage
);
router.post("/profile-image/add-url/:userId", pictureController.addProfileImageUrl);

export default router;
