

module.exports = function (sequelize, DataTypes) {
  var AccessTokens = sequelize.define('AccessTokens',
    {
      tokenId: {
        type: DataTypes.STRING,
        primaryKey: true
      },

      userId: {
        type: DataTypes.STRING,
        primaryKey: true
      },

      applicationId: {
        type: DataTypes.STRING,
        primaryKey: true
      },

      expires: DataTypes.DATE,
      
      
    },
    {
      classMethods: {
        associate(models) {
          AccessTokens.belongsTo(models.Users, { foreignKey: 'userId' });
          AccessTokens.belongsTo(models.Applications, { foreignKey: 'applicationId' });
        }

      },
      createdAt: false,
      updatedAt: false,
      freezeTableName: true
    });

  return AccessTokens;
};
