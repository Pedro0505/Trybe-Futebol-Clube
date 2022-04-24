import { LeaderboardRepository } from '../repositories';
import LeaderboardCreate from '../helpers/LeaderboardCreate';
import { IMatchesLeaderboard } from '../interfaces/helpers';

export default class LeaderboardService {
  private _repository: LeaderboardRepository;

  constructor(repository = new LeaderboardRepository()) {
    this._repository = repository;
  }

  async createHomeLeaderboard() {
    const teams = await this._repository.getAllTeams();
    const matches = await this._repository.getAllMatches() as IMatchesLeaderboard[];
    const createdLeaderboard = new LeaderboardCreate(teams, matches);
    const leaderboard = createdLeaderboard.createHomeLeaderboard();
    const orderLeaderboard = LeaderboardCreate.orderLearderboard(leaderboard);

    return orderLeaderboard;
  }

  async creatAwayLeaderboard() {
    const teams = await this._repository.getAllTeams();
    const matches = await this._repository.getAllMatches() as IMatchesLeaderboard[];
    const createdLeaderboard = new LeaderboardCreate(teams, matches);
    const leaderboard = createdLeaderboard.createAwayLeaderboard();
    const orderLeaderboard = LeaderboardCreate.orderLearderboard(leaderboard);

    return orderLeaderboard;
  }
}
