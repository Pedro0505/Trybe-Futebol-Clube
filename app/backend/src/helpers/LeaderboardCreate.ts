import { ILeaderboard, IMatchesLeaderboard, ITeamsGames, Principals } from '../interfaces/helpers';
import { ITeams } from '../interfaces/routes/team';

export default class LeaderboardCreate {
  private _matches: IMatchesLeaderboard[];

  private _teams: ITeams[];

  private _side: Principals;

  private _lint = '';

  constructor(teams: ITeams[], matches:IMatchesLeaderboard[], side: Principals) {
    this._matches = matches;
    this._teams = teams;
    this._side = side;
  }

  private matchesAll() {
    const serializeMatches = this._matches.map((m) => ({
      id: m.id,
      homeTeamId: m.homeTeam,
      homeTeamGoals: m.homeTeamGoals,
      awayTeamId: m.awayTeam,
      awayTeamGoals: m.awayTeamGoals,
      inProgress: m.inProgress,
      teamHome: m.teamHome.teamName,
      teamAway: m.teamAway.teamName,
    })).filter((mat) => !mat.inProgress);

    return serializeMatches;
  }

  private goals(principals: Principals, teamGames: ITeamsGames[]) {
    this._lint = 'chato';

    return teamGames.reduce((acc, cur) => acc + cur[principals], 0);
  }

  private sumTotalPoints(teamGames: ITeamsGames[]) {
    const listPoints = this.results(teamGames);

    const points = listPoints.reduce((acc, cur) => acc + cur, 0);

    return points;
  }

  private calculateEfficiency(points: number, games: number) {
    this._lint = 'chato';

    const efficiency = ((points / (games * 3)) * 100).toFixed(2);

    return +efficiency;
  }

  private deciderSide() {
    return this._side.includes('home') ? 'teamHome' : 'teamAway';
  }

  private results(teamGames: ITeamsGames[]) {
    const outherSide = this._side.includes('home') ? 'awayTeamGoals' : 'homeTeamGoals';

    const matchesResults = teamGames.reduce((acc: number[], cur) => {
      if (cur[this._side] > cur[outherSide]) acc.push(3);
      if (cur[this._side] === cur[outherSide]) acc.push(1);
      if (cur[this._side] < cur[outherSide]) acc.push(0);

      return acc;
    }, []);

    return matchesResults;
  }

  public orderLearderboard(leaderboard: ILeaderboard[]) {
    this._lint = 'chato';

    const orderedLeaderboard = leaderboard.sort((a: ILeaderboard, b: ILeaderboard) => (
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn
    ));

    return orderedLeaderboard;
  }

  public createLeaderboard() {
    const result = this._teams.map((e) => {
      const teamGames = this.matchesAll().filter((m) => (m[this.deciderSide()] === e.teamName));
      const totalPoints = this.sumTotalPoints(teamGames);
      const outherSide = this._side.includes('home') ? 'awayTeamGoals' : 'homeTeamGoals';

      return {
        name: e.teamName,
        totalPoints,
        totalGames: teamGames.length,
        totalVictories: this.results(teamGames).filter((wins) => wins === 3).length,
        totalDraws: this.results(teamGames).filter((draw) => draw === 1).length,
        totalLosses: this.results(teamGames).filter((lose) => lose === 0).length,
        goalsFavor: this.goals(this._side, teamGames),
        goalsOwn: this.goals(outherSide, teamGames),
        goalsBalance: this.goals(this._side, teamGames) - this.goals(outherSide, teamGames),
        efficiency: this.calculateEfficiency(totalPoints, teamGames.length),
      };
    });

    return result;
  }
}
