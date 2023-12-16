import { ContentList } from "./ContentList.js";
import { ContentItem } from "./ContentItem.js";
import { ContentQueue } from "./ContentQueue.js";
import { Group } from "./Group.js";
import { GroupMember } from "./GroupMember.js";
import { Notification } from "./Notification.js";
import { Picture } from "./Picture.js";
import { RefreshToken } from "./RefreshToken.js";
import { User } from "./User.js";
import { Follower } from "./Follower.js";

User.belongsToMany(Group, {
  through: GroupMember,
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
});
Group.belongsToMany(User, {
  through: GroupMember,
  foreignKey: {
    name: "group_id",
    allowNull: false,
  },
});

Group.hasMany(ContentList, { foreignKey: "group_id" });
ContentList.belongsTo(Group, { foreignKey: "group_id" });
ContentList.hasMany(ContentItem, { foreignKey: "list_id" });
ContentItem.belongsTo(ContentList, { foreignKey: "list_id" });
Group.hasOne(ContentQueue, { foreignKey: "group_id" });
ContentQueue.belongsTo(Group, { foreignKey: "group_id" });
ContentQueue.hasMany(ContentItem, { foreignKey: "queue_id" });
ContentItem.belongsTo(ContentQueue, { foreignKey: "queue_id" });

User.hasMany(Notification, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
});
Notification.belongsTo(User, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
});

User.hasOne(RefreshToken, { foreignKey: "user_id" });
RefreshToken.belongsTo(User, { foreignKey: "user_id" });

export {
  ContentItem,
  ContentList,
  ContentQueue,
  Group,
  GroupMember,
  Notification,
  Picture,
  User,
  RefreshToken,
  Follower,
};
