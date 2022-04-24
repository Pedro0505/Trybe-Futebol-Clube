import { IMatchesLeaderboard } from '../interfaces/helpers';
import { ITeams } from '../interfaces/routes/team';
import Leaderboard from './LeaderboardCreate';

export default class LeaderboardHome extends Leaderboard {
  constructor(teams: ITeams[], matches:IMatchesLeaderboard[]) {
    super(teams, matches, 'homeTeamGoals');
  }

  public createHomeLeaderboard() {
    const created = this.createLeaderboard();

    const ordered = Leaderboard.orderLearderboard(created);

    return ordered;
  }
}
