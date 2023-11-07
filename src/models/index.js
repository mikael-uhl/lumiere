import { User } from "./User.js";
import { Group } from "./Group.js";
import { ContentList } from "./ContentList.js";
import { Category } from "./Category.js";
import { ContentItem } from "./ContentItem.js";
import { ContentQueue } from "./ContentQueue.js";
import { GroupMember } from "./GroupMember.js";
import { Notification } from "./Notification.js";

User.belongsToMany(Group, { through: GroupMember, foreignKey: "user_id" });
Group.belongsToMany(User, { through: GroupMember, foreignKey: "group_id" });
Group.hasMany(ContentList, { foreignKey: "group_id" });
ContentList.belongsTo(Group, { foreignKey: "group_id" });
ContentList.hasMany(Category, { foreignKey: "list_id" });
Category.belongsTo(ContentList, { foreignKey: "list_id" });
Category.hasMany(ContentItem, { foreignKey: "category_id" });
ContentItem.belongsTo(Category, { foreignKey: "category_id" });
ContentList.hasMany(ContentQueue, { foreignKey: "list_id" });
ContentItem.hasMany(ContentQueue, { foreignKey: "item_id" });
User.hasMany(Notification, { foreignKey: "user_id" });
Notification.belongsTo(User, { foreignKey: "user_id" });

export {
  Category,
  ContentItem,
  ContentList,
  ContentQueue,
  Group,
  GroupMember,
  Notification,
  User,
};
