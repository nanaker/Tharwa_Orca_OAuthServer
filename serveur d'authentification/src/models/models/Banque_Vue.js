/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Banque_Vue', {
    Code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    RaisonSocial: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Adresse: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Mail: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Banque_Vue'
  });
};
