import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import { ITeams } from '../interfaces/routes/team';
import { IMatchesTeams } from '../interfaces/routes/matches';

export default class LeaderboardRepository {
  constructor(private _matchesModel = Matches, private _teamsModel = Teams) {}

  async getAllMatches(): Promise<IMatchesTeams[]> {
    const matches = await this._matchesModel.findAll({
      where: { inProgress: false },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  }

  async getAllTeams(): Promise<ITeams[]> {
    const teams = await this._teamsModel.findAll();

    return teams;
  }
}
