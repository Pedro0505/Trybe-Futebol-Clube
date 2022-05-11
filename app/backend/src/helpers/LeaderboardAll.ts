import { IMatchesLeaderboard } from '../interfaces/helpers';
import { ITeams } from '../interfaces/routes/team';
import LeaderboardAway from './LeaderboardAway';
import LeaderboardHome from './LeaderboardHome';
import Leaderboard from './Leaderboard';

export default class LeaderboardAll {
  private _home: LeaderboardHome;

  private _away: LeaderboardAway;

  constructor(teams: ITeams[], matches: IMatchesLeaderboard[]) {
    this._away = new LeaderboardAway(teams, matches);
    this._home = new LeaderboardHome(teams, matches);
  }

  private schemaLeaderboard() {
    const away = this._away.awayLeaderboard().sort((a, b) => (a.name < b.name ? -1 : 1));
    const home = this._home.homeLeaderboard().sort((a, b) => (a.name < b.name ? -1 : 1));

    return away.map((t, i) => {
      const totalPoints = t.totalPoints + home[i].totalPoints;
      const goalsFavor = t.goalsFavor + home[i].goalsFavor;

      return {
        name: t.name,
        totalPoints,
        totalGames: t.totalGames + home[i].totalGames,
        totalVictories: t.totalVictories + home[i].totalVictories,
        totalDraws: t.totalDraws + home[i].totalDraws,
        totalLosses: t.totalLosses + home[i].totalLosses,
        goalsFavor,
        goalsOwn: t.goalsOwn + home[i].goalsOwn,
        goalsBalance: goalsFavor - (t.goalsOwn + home[i].goalsOwn),
        efficiency: Leaderboard.calculateEfficiency(totalPoints, t.totalGames + home[i].totalGames),
      };
    });
  }

  public createLeaderboardAll() {
    const leaderboard = this.schemaLeaderboard();

    return Leaderboard.orderLearderboard(leaderboard);
  }
}
