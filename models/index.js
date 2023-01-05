const User = require("./user");
const Planner = require("./planner");
const Comment = require("./comment");

User.hasMany(Planner, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Planner.belongsTo(User, {
  foreignKey: "user_id",
});

Planner.hasMany(Comment, {
  foreignKey: "plan_id",
  onDelete: 'CASCADE'
});

Comment.belongsTo(Planner, {
  foreignKey: 'plan_id'
});

User.hasMany(Comment,{
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Planner };
