// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Matches extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

  }
  Matches.init(
    {
      homeTeamId: DataTypes.INTEGER,
      homeTeamGoals: DataTypes.INTEGER,
      awayTeamId: DataTypes.INTEGER,
      awayTeamGoals: DataTypes.INTEGER,
      inProgress: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'matches',
    },
  );
  return Matches;
};
