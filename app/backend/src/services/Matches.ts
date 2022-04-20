import { IMatches } from '../interfaces/routes/matches';
import { IServiceReturnSuccess } from '../interfaces/service';
import { MatchesRepository } from '../repositories';

export default class MatchesService {
  private _repository: MatchesRepository;

  constructor(repository = new MatchesRepository()) {
    this._repository = repository;
  }

  public async getAll(inProgress: string | undefined) {
    const matches = await this._repository.getAll();

    if (inProgress !== undefined) {
      const progress = inProgress === 'true';
      const matchesInProgress = await this._repository.getMatchesInProgress(progress);

      const response: IServiceReturnSuccess<IMatches[]> = { code: 200, data: matchesInProgress };

      return response;
    }

    const sucess: IServiceReturnSuccess<IMatches[]> = { code: 200, data: matches };

    return sucess;
  }
}
