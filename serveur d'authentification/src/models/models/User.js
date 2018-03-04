/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    Id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    UserName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Pwd: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Type: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'User'
  });
};
