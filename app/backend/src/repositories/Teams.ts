import { ITeams } from '../interfaces/routes/team';
import Teams from '../database/models/Teams';

export default class TeamsRepository {
  constructor(private _model = Teams) {}

  public async getAll(): Promise<ITeams[]> {
    const teams = await this._model.findAll();

    return teams;
  }

  public async getById(id: string): Promise<ITeams | null> {
    const teams = await this._model.findOne({ where: { id } });

    return teams;
  }
}
