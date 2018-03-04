/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Compte_Vue', {
    Num: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Balance: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    DateCreation: {
      type: DataTypes.DATE,
      allowNull: false
    },
    CodeMonnaie: {
      type: DataTypes.STRING,
      allowNull: false
    },
    IdUser: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Etat: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TypeCompte: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'Compte_Vue'
  });
};
