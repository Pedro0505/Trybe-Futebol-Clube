import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import {
  IMatcheCreateRequest,
  IMatches,
  IMatchesTeams,
  IMatcheUpdateRequest,
} from '../interfaces/routes/matches';

export default class MatchesRepository {
  constructor(private _model = Matches) {}

  public async getAll(): Promise<IMatchesTeams[]> {
    const matches = await this._model.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  }

  public async getMatchesInProgress(inProgress: boolean): Promise<IMatchesTeams[]> {
    const matches = await this._model.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  }

  public async createMatches(matche: IMatcheCreateRequest): Promise<IMatches> {
    const createdMatche = await this._model.create(matche);

    return createdMatche;
  }

  public async finishedMatches(id: string) {
    await this._model.update({ inProgress: false }, { where: { id } });
  }

  public async updateMatches({ awayTeamGoals, homeTeamGoals }: IMatcheUpdateRequest, id: string) {
    await this._model.update({ awayTeamGoals, homeTeamGoals }, { where: { id } });
  }
}
