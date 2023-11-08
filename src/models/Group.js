import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index.js";

export class Group extends Model {}

Group.init(
  {
    group_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    group_name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Group",
    timestamps: false,
  }
);
