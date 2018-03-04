

module.exports = function (sequelize, DataTypes) {
  var Applications = sequelize.define('Applications',
    {
      applicationId: {
        type: DataTypes.STRING,
        primaryKey: true
      },

      secret: DataTypes.STRING,
      description: DataTypes.STRING,
      grantTypes: DataTypes.STRING,
    },
    {
      classMethods: {
        associate(models) {
          Applications.hasMany(models.AccessTokens, {
            foreignKey: 'applicationId'
          });
        }
      },
      createdAt: false,
      updatedAt: false,
      freezeTableName: true
    });

  return Applications;
};
