

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/index');

const db = {};

const sequelize = new Sequelize(config.dbConnString.options.database,
    config.dbConnString.userName,
    config.dbConnString.password,
  {
    host: config.dbConnString.server,
    dialect: 'mssql',
    pool: {
      max: 50,
      min: 0,
      idle: 3000
    },
    dialectOptions: {
      encrypt: config.dbConnString.options.encrypt
    }
  });

// load all models
fs.readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
    .forEach((file) => {
      const model = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
    });

// load all models keys
Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

// replicate DB changes
sequelize.sync();

// export connection
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
