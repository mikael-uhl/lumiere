import { DataTypes, Model } from "sequelize";
import sequelize from "../../db/index.js";

export class Category extends Model {}

Category.init(
  {
    category_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    category_name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Category",
    timestamps: false,
  }
);