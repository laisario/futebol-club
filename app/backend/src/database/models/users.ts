import { Model, DataTypes } from 'sequelize';
import db from '.';

class Users extends Model {
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

Users.init(
  {
    username: DataTypes.STRING,
    role: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    // ... Outras configs
    underscored: true,
    sequelize: db,
    modelName: 'users',
    timestamps: false,
  },
);

export default Users;
