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
    const createdLeaderboard = new LeaderboardCreate(teams, matches, 'homeTeamGoals');
    const leaderboard = createdLeaderboard.createLeaderboard();
    const orderLeaderboard = createdLeaderboard.orderLearderboard(leaderboard);

    return orderLeaderboard;
  }

  async creatAwayLeaderboard() {
    const teams = await this._repository.getAllTeams();
    const matches = await this._repository.getAllMatches() as IMatchesLeaderboard[];
    const createdLeaderboard = new LeaderboardCreate(teams, matches, 'awayTeamGoals');
    const leaderboard = createdLeaderboard.createLeaderboard();
    const orderLeaderboard = createdLeaderboard.orderLearderboard(leaderboard);

    return orderLeaderboard;
  }
}
