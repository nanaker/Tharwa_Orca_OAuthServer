/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TarifCommission', {
    Code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    montant: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Pourcentage: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    tableName: 'TarifCommission'
  });
};
