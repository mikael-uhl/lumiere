import { DataTypes, Model } from 'sequelize';
import sequelize from "../../db/index.js";

export class ContentQueue extends Model {}

ContentQueue.init(
  {
    queue_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'ContentQueue',
    timestamps: false,
  }
);
