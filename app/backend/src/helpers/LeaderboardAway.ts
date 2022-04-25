import { IMatchesLeaderboard } from '../interfaces/helpers';
import { ITeams } from '../interfaces/routes/team';
import Leaderboard from './Leaderboard';

export default class LeaderboardAway extends Leaderboard {
  constructor(teams: ITeams[], matches: IMatchesLeaderboard[]) {
    super(teams, matches, 'awayTeamGoals');
  }

  public createAwayLeaderboard() {
    const created = this.createLeaderboard();

    const ordered = Leaderboard.orderLearderboard(created);

    return ordered;
  }
}
