import { IMatches } from '../interfaces/routes/matches';
import { IServiceReturnSuccess } from '../interfaces/service';
import { MatchesRepository } from '../repositories';

export default class MatchesService {
  private _repository: MatchesRepository;

  constructor(repository = new MatchesRepository()) {
    this._repository = repository;
  }

  public async getAll() {
    const matches = await this._repository.getAll();

    const sucess: IServiceReturnSuccess<IMatches[]> = {
      code: 200,
      data: matches,
    };

    return sucess;
  }
}
