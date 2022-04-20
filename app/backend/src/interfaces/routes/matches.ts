export interface IMatches {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchesTeams extends IMatches {
  teamHome: { teamName: string; };
  teamAway: { teamName: string; };
}
