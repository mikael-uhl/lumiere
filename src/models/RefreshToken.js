import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index.js";

export class RefreshToken extends Model {}

RefreshToken.init(
  {
    refresh_token_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    expires_in: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "RefreshToken",
    timestamps: false,
  }
);
