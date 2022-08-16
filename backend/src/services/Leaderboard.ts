import { LeaderboardRepository } from '../repositories';
import { IMatchesLeaderboard } from '../interfaces/helpers';
import LeaderboardHome from '../helpers/LeaderboardHome';
import LeaderboardAway from '../helpers/LeaderboardAway';
import LeaderboardAll from '../helpers/LeaderboardAll';

export default class LeaderboardService {
  private _repository: LeaderboardRepository;

  constructor(repository = new LeaderboardRepository()) {
    this._repository = repository;
  }

  public async createHomeLeaderboard() {
    const teams = await this._repository.getAllTeams();
    const matches = await this._repository.getAllMatches() as IMatchesLeaderboard[];
    const createdLeaderboard = new LeaderboardHome(teams, matches).homeLeaderboard();

    return createdLeaderboard;
  }

  public async creatAwayLeaderboard() {
    const teams = await this._repository.getAllTeams();
    const matches = await this._repository.getAllMatches() as IMatchesLeaderboard[];
    const createdLeaderboard = new LeaderboardAway(teams, matches).awayLeaderboard();

    return createdLeaderboard;
  }

  public async createAllLeaderboard() {
    const teams = await this._repository.getAllTeams();
    const matches = await this._repository.getAllMatches() as IMatchesLeaderboard[];
    const createdLeaderboard = new LeaderboardAll(teams, matches).createLeaderboardAll();

    return createdLeaderboard;
  }
}
