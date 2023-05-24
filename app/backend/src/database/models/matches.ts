import { Model, DataTypes } from 'sequelize';
import db from '.';

class Matches extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  homeTeamId: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeamId: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.BOOLEAN,
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'Matches',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

export default Matches;
