import { DataTypes, Model } from 'sequelize';
import sequelize from "../../db/index.js";

export class ContentList extends Model {}

ContentList.init(
  {
    list_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    list_name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'ContentList',
    timestamps: false,
  }
);
