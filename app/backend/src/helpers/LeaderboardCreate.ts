import { IMatchesLeaderboard, ITeamsGames, Principals, TeamsGames } from '../interfaces/helpers';
import { ITeams } from '../interfaces/routes/team';
import { teamDraw, teamLose, teamWins } from './ResultsCreate';

const matchesAll = (matche: IMatchesLeaderboard[]) => matche.map((e) => ({
  id: e.id,
  homeTeamId: e.homeTeam,
  homeTeamGoals: e.homeTeamGoals,
  awayTeamId: e.awayTeam,
  awayTeamGoals: e.awayTeamGoals,
  inProgress: e.inProgress,
  teamHome: e.teamHome.teamName,
  teamAway: e.teamAway.teamName,
})).filter((mat) => !mat.inProgress);

const goals = (principals: Principals, teamGames: ITeamsGames[]) => (
  teamGames.reduce((acc, cur) => acc + cur[principals], 0));

const sumTotalPoints = (teamGames: TeamsGames[], side: Principals) => {
  const listPoints = [...teamWins(teamGames, side), ...teamDraw(teamGames, side)];
  const points = listPoints.reduce((acc, cur) => acc + cur, 0);

  return points;
};

const calculateEfficiency = (points: number, games: number) => {
  const efficiency = ((points / (games * 3)) * 100).toFixed(2);

  return +efficiency;
};
const deciderSide = (side: Principals) => (side.includes('home') ? 'teamHome' : 'teamAway');

const createLeaderboard = (teams: ITeams[], matches: IMatchesLeaderboard[], side: Principals) => {
  const result = teams.map((e) => {
    const teamGames = matchesAll(matches).filter((m) => (m[deciderSide(side)] === e.teamName));
    const totalPoints = sumTotalPoints(teamGames, side);
    const outherSide = side.includes('home') ? 'awayTeamGoals' : 'homeTeamGoals';

    return {
      name: e.teamName,
      totalPoints,
      totalGames: teamGames.length,
      totalVictories: teamWins(teamGames, side).length,
      totalDraws: teamDraw(teamGames, side).length,
      totalLosses: teamLose(teamGames, side).length,
      goalsFavor: goals(side, teamGames),
      goalsOwn: goals(outherSide, teamGames),
      goalsBalance: goals(side, teamGames) - goals(outherSide, teamGames),
      efficiency: calculateEfficiency(totalPoints, teamGames.length),
    };
  });

  return result;
};

export default createLeaderboard;
