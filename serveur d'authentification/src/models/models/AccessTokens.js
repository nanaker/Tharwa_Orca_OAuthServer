/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AccessTokens', {
    tokenId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    applicationId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'AccessTokens'
  });
};
