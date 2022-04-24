import { LeaderboardRepository } from '../repositories';
import createLeaderboard from '../helpers/LeaderboardCreate';
import { ILeaderboard, IMatchesLeaderboard } from '../interfaces/helpers';

const order = (a: ILeaderboard, b: ILeaderboard) => (
  b.totalPoints - a.totalPoints
  || b.totalVictories - a.totalVictories
  || b.goalsBalance - a.goalsBalance
  || b.goalsFavor - a.goalsFavor
  || b.goalsOwn - a.goalsOwn
);

export default class LeaderboardService {
  private _repository: LeaderboardRepository;

  constructor(repository = new LeaderboardRepository()) {
    this._repository = repository;
  }

  async createHomeLeaderboard() {
    const teams = await this._repository.getAllTeams();
    const matches = await this._repository.getAllMatches() as IMatchesLeaderboard[];
    const leaderboard = createLeaderboard(teams, matches, 'homeTeamGoals');
    const orderLeaderboard = leaderboard.sort(order);

    return orderLeaderboard;
  }

  async creatAwayLeaderboard() {
    const teams = await this._repository.getAllTeams();
    const matches = await this._repository.getAllMatches() as IMatchesLeaderboard[];
    const leaderboard = createLeaderboard(teams, matches, 'awayTeamGoals');
    const orderLeaderboard = leaderboard.sort(order);

    return orderLeaderboard;
  }
}
