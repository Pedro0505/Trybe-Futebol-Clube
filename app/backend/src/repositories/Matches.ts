import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

export default class MatchesRepository {
  constructor(private _model = Matches) {}

  public async getAll() {
    const teams = await this._model.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return teams;
  }
}
