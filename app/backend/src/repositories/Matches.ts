import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

export default class MatchesRepository {
  constructor(private _model = Matches) {}

  public async getAll() {
    const matches = await this._model.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  }

  public async getMatchesInProgress(inProgress: boolean) {
    const matches = await this._model.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  }
}
