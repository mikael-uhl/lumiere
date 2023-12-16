import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index.js";
import { User } from "./index.js";

export class Follower extends Model {}

Follower.init(
  {
    follower_id: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "user_id",
      },
      primaryKey: true,
    },
    following_id: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "user_id",
      },
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "Follower",
    timestamps: false,
  }
);
