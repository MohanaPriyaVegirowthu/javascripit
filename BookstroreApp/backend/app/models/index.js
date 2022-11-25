const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: true,
  timezone: "Asia/Kolkata",
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user.model")(sequelize, Sequelize);
db.bookStoretbl = require("./books.model")(sequelize, Sequelize);
db.usersBookScriptiontbl = require("./user_Booksubscription.model")(sequelize, Sequelize)
db.booksAuthorstbl = require("./booksAuthors.model")(sequelize, Sequelize)
module.exports = db;
