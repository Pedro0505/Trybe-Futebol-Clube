import { ITeams } from '../interfaces/routes/team';
import { IServiceReturnError, IServiceReturnSuccess } from '../interfaces/service';
import { TeamsRepository } from '../repositories';

export default class TeamsService {
  private _repository: TeamsRepository;

  constructor(repository = new TeamsRepository()) {
    this._repository = repository;
  }

  public async getAll() {
    const teams = await this._repository.getAll();

    const sucess: IServiceReturnSuccess<ITeams[]> = {
      code: 200,
      data: teams,
    };

    return sucess;
  }

  public async getById(id: string) {
    const teams = await this._repository.getById(id);

    const notFoundTeam: IServiceReturnError = { code: 404, data: { message: 'Team not found' } };

    if (!teams) return notFoundTeam;

    const sucess: IServiceReturnSuccess<ITeams> = { code: 200, data: teams };

    return sucess;
  }
}
