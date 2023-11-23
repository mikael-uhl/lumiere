import { Picture, User } from "../models/index.js";
import { join } from "path";
import fetch from "node-fetch";
import fs from "fs/promises";
import getProjectRoot from "../config/projectRoot.js";

const IMAGES_PATH = join(getProjectRoot(), "src", "images");

export const uploadPicture = async (req, res) => {
  try {
    const file = req.file;
    const picture = await Picture.create({
      picture_src: file.path,
    });

    return res.status(201).json(picture);
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao realizar upload da imagem",
      error: error.message,
    });
  }
};

export const uploadProfileImage = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado!" });
    }

    const file = req.file;
    const picture = await Picture.create({
      picture_src: file.path,
    });

    await user.update({ profile_image_url: picture.picture_id });
    return res.status(201).json(picture);
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao realizar upload da imagem de perfil",
      error: error.message,
    });
  }
};

export const addImageUrl = async (req, res) => {
  try {
    const { imageLink } = req.body;

    const response = await fetch(imageLink);
    const imageArrayBuffer = await response.arrayBuffer();
    const imageBuffer = Buffer.from(imageArrayBuffer);

    const fileExtension = imageLink.split(".").pop();
    const fileName = `${Date.now()}.${fileExtension}`;

    const imagePath = join(IMAGES_PATH, fileName);
    await fs.writeFile(imagePath, imageBuffer);

    const picture = await Picture.create({
      picture_src: join("src", "images", fileName),
    });

    return res.status(201).json(picture);
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao realizar upload da imagem",
      error: error.message,
    });
  }
};
export const addProfileImageUrl = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado!" });
    }
    const { imageLink } = req.body;

    const response = await fetch(imageLink);
    const imageArrayBuffer = await response.arrayBuffer();
    const imageBuffer = Buffer.from(imageArrayBuffer);

    const fileExtension = imageLink.split(".").pop();
    const fileName = `${Date.now()}.${fileExtension}`;

    const imagePath = join(IMAGES_PATH, fileName);
    console.log(imagePath);
    await fs.writeFile(imagePath, imageBuffer);

    const picture = await Picture.create({
      picture_src: join("src", "images", fileName),
    });

    await user.update({ profile_image_url: picture.picture_id });

    return res.status(201).json(picture);
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao realizar upload da imagem",
      error: error.message,
    });
  }
};

export const getAllPictures = async (req, res) => {
  try {
    const pictures = await Picture.findAll();
    return res.status(200).json(pictures);
  } catch (error) {
    console.error("Erro ao buscar todos as imagens:", error);
    return res.status(500).json({ error: "Erro ao buscar imagens" });
  }
};

export const getPictureById = async (req, res) => {
  try {
    const { pictureId } = req.params;
    const picture = await Picture.findByPk(pictureId);
    const imagePath = join(getProjectRoot(), picture.picture_src);
    return res.status(200).sendFile(imagePath);
  } catch (error) {
    console.error("Erro ao buscar imagem:", error);
    return res.status(500).json({ error: "Erro ao buscar imagem" });
  }
};

export const deletePicture = async (req, res) => {
  try {
    const { pictureId } = req.params;
    const picture = await Picture.findByPk(pictureId);

    if (!picture) {
      return res.status(404).json({ error: "Imagem não encontrada!" });
    }

    const imagePath = join(getProjectRoot(), picture.picture_src);
    const fileExists = await fs
      .access(imagePath)
      .then(() => true)
      .catch(() => false);

    await picture.destroy();

    if (fileExists) {
      await fs.unlink(imagePath);
      console.log("Imagem deletada dos arquivos!");
    }

    return res.status(204).json({ message: "Imagem excluída com sucesso!" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao excluir imagem!" });
  }
};
