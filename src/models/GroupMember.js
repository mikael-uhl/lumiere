import { DataTypes, Model } from 'sequelize';
import sequelize from "../../db/index.js";

export class GroupMember extends Model {}

GroupMember.init(
  {
    member_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'GroupMember',
    timestamps: false,
  }
);
