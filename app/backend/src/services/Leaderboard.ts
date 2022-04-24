import { LeaderboardRepository } from '../repositories';
import { IMatchesLeaderboard } from '../interfaces/helpers';
import LeaderboardHome from '../helpers/LeaderboardHome';
import LeaderboardAway from '../helpers/LeaderboardAway';

export default class LeaderboardService {
  private _repository: LeaderboardRepository;

  constructor(repository = new LeaderboardRepository()) {
    this._repository = repository;
  }

  public async createHomeLeaderboard() {
    const teams = await this._repository.getAllTeams();
    const matches = await this._repository.getAllMatches() as IMatchesLeaderboard[];
    const createdLeaderboard = new LeaderboardHome(teams, matches).createHomeLeaderboard();

    return createdLeaderboard;
  }

  public async creatAwayLeaderboard() {
    const teams = await this._repository.getAllTeams();
    const matches = await this._repository.getAllMatches() as IMatchesLeaderboard[];
    const createdLeaderboard = new LeaderboardAway(teams, matches).createAwayLeaderboard();

    return createdLeaderboard;
  }
}
