/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Applications', {
    applicationId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Applications',
        key: 'applicationId'
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    secret: {
      type: DataTypes.STRING,
      allowNull: true
    },
    grantTypes: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updateAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'Applications'
  });
};
