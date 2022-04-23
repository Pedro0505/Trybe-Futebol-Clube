import { IMatcheCreateRequest, IMatches } from '../interfaces/routes/matches';
import { IServiceReturnError, IServiceReturnSuccess } from '../interfaces/service';
import { MatchesRepository, TeamsRepository } from '../repositories';

export default class MatchesService {
  private _repository: MatchesRepository;

  private teamsRepository: TeamsRepository;

  constructor(repository = new MatchesRepository()) {
    this._repository = repository;
    this.teamsRepository = new TeamsRepository();
  }

  private async findTeams(...teamsId: number[]): Promise<boolean> {
    const teams = await this.teamsRepository.getAll();

    const idTeams = teams.map((e) => e.id);

    const verifyTeams = teamsId.every((ids) => idTeams.includes(ids));

    return verifyTeams;
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

  public async create(matche: IMatcheCreateRequest) {
    const equalTeams: IServiceReturnError = {
      code: 401,
      data: { message: 'It is not possible to create a match with two equal teams' },
    };

    if (matche.homeTeam === matche.awayTeam) return equalTeams;

    const teamsExist = await this.findTeams(matche.homeTeam, matche.awayTeam);

    const teamNotExist: IServiceReturnError = {
      code: 404, data: { message: 'There is no team with such id!' },
    };

    if (!teamsExist) return teamNotExist;

    const createdMatche = await this._repository.createMatches(matche);

    const createdResponse: IServiceReturnSuccess<IMatches> = { code: 201, data: createdMatche };

    return createdResponse;
  }

  public async finishedMatches(id: string) {
    const updated = await this._repository.finishedMatches(id);

    return updated;
  }
}
