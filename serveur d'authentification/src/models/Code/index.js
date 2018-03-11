

module.exports = function (sequelize, DataTypes) {
    var Code = sequelize.define('Code',
      {
        codeId: {
          type: DataTypes.STRING,
          primaryKey: true
        },
  
        userId: {
          type: DataTypes.STRING,
          primaryKey: true
        },
  
        
        expires: DataTypes.DATE,
        
        
      },
      {
        classMethods: {
          associate(models) {
            Code.belongsTo(models.Users, { foreignKey: 'userId' });
          }
  
        },
        createdAt: false,
        updatedAt: false,
        freezeTableName: true
      });
  
    return Code;
  };
  