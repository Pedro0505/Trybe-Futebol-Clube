import { IMatchesLeaderboard } from '../interfaces/helpers';
import { ITeams } from '../interfaces/routes/team';
import Leaderboard from './Leaderboard';

export default class LeaderboardHome extends Leaderboard {
  constructor(teams: ITeams[], matches:IMatchesLeaderboard[]) {
    super(teams, matches, 'homeTeamGoals');
  }

  private createHomeLeaderboard() {
    const result = this._teams.map((e) => {
      const teamGames = this.matchesAll().filter((m) => (m.teamHome === e.teamName));
      const totalPoints = this.sumTotalPoints(teamGames);

      return {
        name: e.teamName,
        totalPoints,
        totalGames: teamGames.length,
        totalVictories: this.results(teamGames).filter((wins) => wins === 3).length,
        totalDraws: this.results(teamGames).filter((draw) => draw === 1).length,
        totalLosses: this.results(teamGames).filter((lose) => lose === 0).length,
        goalsFavor: Leaderboard.goal('homeTeamGoals', teamGames),
        goalsOwn: Leaderboard.goal('awayTeamGoals', teamGames),
        goalsBalance: Leaderboard
          .goal('homeTeamGoals', teamGames) - Leaderboard.goal('awayTeamGoals', teamGames),
        efficiency: Leaderboard.calculateEfficiency(totalPoints, teamGames.length),
      };
    });

    return result;
  }

  public homeLeaderboard() {
    const ordered = Leaderboard.orderLearderboard(this.createHomeLeaderboard());

    return ordered;
  }
}
