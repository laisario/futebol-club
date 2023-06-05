import { Model, DataTypes } from 'sequelize';
import db from '.';
import Teams from './teams';

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

Teams.hasMany(Matches, { foreignKey: 'home_team_id', as: 'homeTeam' });
Matches.belongsTo(Teams, { foreignKey: 'home_team_id', as: 'homeTeam' });

Teams.hasMany(Matches, { foreignKey: 'away_team_id', as: 'awayTeam' });
Matches.belongsTo(Teams, { foreignKey: 'away_team_id', as: 'awayTeam' });

export default Matches;
