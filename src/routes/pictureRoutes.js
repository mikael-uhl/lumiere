import express from "express";
import { pictureController } from "../controllers/index.js";
import authenticationMiddleware from "../config/authenticationMiddleware.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/upload", authenticationMiddleware, upload.single("file"), pictureController.uploadPicture);
router.post("/add-url", authenticationMiddleware, pictureController.addImageUrl);
router.get("/", pictureController.getAllPictures);
router.get("/:pictureId", pictureController.getPictureById);
router.delete("/:pictureId", authenticationMiddleware, pictureController.deletePicture);
router.post(
  "/profile-image/upload/:userId",
  authenticationMiddleware,
  upload.single("file"),
  pictureController.uploadProfileImage
);
router.post("/profile-image/add-url/:userId", pictureController.addProfileImageUrl);

export default router;
