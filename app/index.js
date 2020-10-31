const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
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

db.tutorials.hasMany(db.comments, { as: "comments",onDelete: 'cascade',hooks: true, });
db.comments.belongsTo(db.tutorials, {
  onDelete: 'cascade',
  foreignKey: "tutorialId",
  hooks: true,
  as: "tutorial",
});

module.exports = db;