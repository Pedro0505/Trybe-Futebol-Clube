import { ILeaderboard, IMatchesLeaderboard, ITeamsGames, Principals } from '../interfaces/helpers';
import { ITeams } from '../interfaces/routes/team';

export default abstract class Leaderboard {
  protected _matches: IMatchesLeaderboard[];

  protected _teams: ITeams[];

  private _side: Principals;

  constructor(teams: ITeams[], matches:IMatchesLeaderboard[], side: Principals) {
    this._matches = matches;
    this._teams = teams;
    this._side = side;
  }

  protected matchesAll() {
    const serializeMatches = this._matches.map((m) => ({
      id: m.id,
      homeTeamId: m.homeTeam,
      homeTeamGoals: m.homeTeamGoals,
      awayTeamId: m.awayTeam,
      awayTeamGoals: m.awayTeamGoals,
      inProgress: m.inProgress,
      teamHome: m.teamHome.teamName,
      teamAway: m.teamAway.teamName,
    }));

    return serializeMatches;
  }

  static goal(principals: Principals, teamGames: ITeamsGames[]) {
    return teamGames.reduce((acc, cur) => acc + cur[principals], 0);
  }

  protected sumTotalPoints(teamGames: ITeamsGames[]) {
    const listPoints = this.results(teamGames);

    const points = listPoints.reduce((acc, cur) => acc + cur, 0);

    return points;
  }

  static calculateEfficiency(points: number, games: number) {
    const efficiency = ((points / (games * 3)) * 100).toFixed(2);

    return +efficiency;
  }

  protected deciderSide() {
    return this._side.includes('home') ? 'teamHome' : 'teamAway';
  }

  protected results(teamGames: ITeamsGames[]) {
    const outherSide = this._side.includes('home') ? 'awayTeamGoals' : 'homeTeamGoals';

    const matchesResults = teamGames.reduce((acc: number[], cur) => {
      if (cur[this._side] > cur[outherSide]) acc.push(3);
      if (cur[this._side] === cur[outherSide]) acc.push(1);
      if (cur[this._side] < cur[outherSide]) acc.push(0);

      return acc;
    }, []);

    return matchesResults;
  }

  static orderLearderboard(leaderboard: ILeaderboard[]) {
    const orderedLeaderboard = leaderboard.sort((a: ILeaderboard, b: ILeaderboard) => (
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn
    ));

    return orderedLeaderboard;
  }
}
