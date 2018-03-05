module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users',
    {
      userId: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      
      type: DataTypes.STRING,
      
      password: DataTypes.STRING,
      username: DataTypes.STRING,
      numTel: DataTypes.STRING,
      
    },
    {
      classMethods: {
        associate(models) {
          Users.hasMany(models.AccessTokens, {
            foreignKey: 'userId'
          });
        }
      },
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      freezeTableName: true
    });

  return Users;
};
