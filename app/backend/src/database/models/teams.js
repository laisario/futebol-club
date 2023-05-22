// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Teams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Matches.hasMany(models.Teams);
      models.Teams.belongsTo(models.Matches);
    }
  }
  Teams.init({
    id: DataTypes.INTEGER,
    teamName: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Teams',
  });
  return Teams;
};
