import { Model, DataTypes } from 'sequelize';
import db from '.';
import Matches from './matches';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: DataTypes.INTEGER,
  teamName: DataTypes.STRING,
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

Matches.hasMany(Teams, { foreignKey: 'id', as: 'home_team_id' });
Teams.belongsTo(Matches, { foreignKey: 'id', as: 'away_team_id' });

export default Teams;
