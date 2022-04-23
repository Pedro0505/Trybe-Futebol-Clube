export interface IMatcheCreateRequest {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatches extends IMatcheCreateRequest {
  id: number;
}

export interface IMatchesTeams extends IMatches {
  teamHome?: { teamName: string; };
  teamAway?: { teamName: string; };
}
