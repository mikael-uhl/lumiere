import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index.js";

export class ContentItem extends Model {}

ContentItem.init(
  {
    item_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    original_title: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    genre: {
      type: DataTypes.STRING,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "ContentItem",
    timestamps: false,
  }
);
