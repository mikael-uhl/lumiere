import { DataTypes, Model } from 'sequelize';
import sequelize from "../../db/index.js";

export class Notification extends Model {}

Notification.init(
  {
    notification_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    message: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'Notification',
    timestamps: false,
  }
);
