import { IMatchesLeaderboard } from '../interfaces/helpers';
import { ITeams } from '../interfaces/routes/team';
import Leaderboard from './Leaderboard';

export default class LeaderboardAway extends Leaderboard {
  constructor(teams: ITeams[], matches: IMatchesLeaderboard[]) {
    super(teams, matches, 'awayTeamGoals');
  }

  private createAwayLeaderboard() {
    const result = this._teams.map((e) => {
      const teamGames = this.matchesAll().filter((m) => (m.teamAway === e.teamName));
      const totalPoints = this.sumTotalPoints(teamGames);

      return {
        name: e.teamName,
        totalPoints,
        totalGames: teamGames.length,
        totalVictories: this.results(teamGames).filter((wins) => wins === 3).length,
        totalDraws: this.results(teamGames).filter((draw) => draw === 1).length,
        totalLosses: this.results(teamGames).filter((lose) => lose === 0).length,
        goalsFavor: Leaderboard.goal('awayTeamGoals', teamGames),
        goalsOwn: Leaderboard.goal('homeTeamGoals', teamGames),
        goalsBalance: Leaderboard
          .goal('awayTeamGoals', teamGames) - Leaderboard.goal('homeTeamGoals', teamGames),
        efficiency: Leaderboard.calculateEfficiency(totalPoints, teamGames.length),
      };
    });

    return result;
  }

  public awayLeaderboard() {
    const ordered = Leaderboard.orderLearderboard(this.createAwayLeaderboard());

    return ordered;
  }
}
