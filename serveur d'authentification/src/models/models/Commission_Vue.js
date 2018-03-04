/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Commission_Vue', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CodeCommission: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Montant: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    NumCompte: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Commission_Vue'
  });
};
