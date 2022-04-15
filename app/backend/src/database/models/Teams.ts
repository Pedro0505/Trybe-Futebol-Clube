import { DataTypes, Model } from 'sequelize';
import db from '.';

class Teams extends Model {
  id!: number;

  teamName!: string;
}

const teamsColumns = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  team_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

const config = {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
};

Teams.init(teamsColumns, config);

export default Teams;
