const dbConfig = require("./config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.DB, 
  dbConfig.USER, 
  dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});



const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./models/tutorial.model.js")(sequelize, Sequelize);
db.comments = require("./models/comment.model.js")(sequelize, Sequelize);
db.tag = require("./models/tag.model.js")(sequelize, Sequelize);
db.authors = require("./models/author.model.js")(sequelize, Sequelize);
db.user = require("./models/user.model.js")(sequelize, Sequelize);
db.role = require("./models/role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];



db.authors.hasMany(db.tutorials, { as: "tutorials" });
db.tutorials.belongsTo(db.authors, {
  //onDelete: 'cascade',
 // foreignKey: { allowNull: false },//<-------required for cascading delete
 foreignKey: "authorId",
 // hooks: true,
  as: "authors",
});

db.tutorials.hasMany(db.comments, { as: "comments",onDelete: 'cascade',hooks: true, });
db.comments.belongsTo(db.tutorials, {
  onDelete: 'cascade',
  foreignKey: { allowNull: false },//<-------required for cascading delete
 // foreignKey: "tutorialId",
  hooks: true,
  as: "tutorial",
});

db.tag.belongsToMany(db.tutorials, {
  through: "tutorial_tag",
  as: "tutorials",
  foreignKey: "tag_id",
});
db.tutorials.belongsToMany(db.tag, {
  through: "tutorial_tag",
  as: "tags",
  foreignKey: "tutorial_id",
});

module.exports = db;