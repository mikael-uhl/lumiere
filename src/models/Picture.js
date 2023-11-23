import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index.js";

export class Picture extends Model {}

Picture.init(
  {
    picture_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    picture_src: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Picture",
    timestamps: false,
  }
);
