import { JwtPayload } from 'jsonwebtoken';

export interface IPayloadJwt {
  id?: number;
  email: string;
  role: string;
}

export interface IDecoded extends JwtPayload {
  tokenData: IPayloadJwt
}

export type Principals = 'homeTeamGoals' | 'awayTeamGoals';

export type SideTeam = 'teamHome' | 'teamAway';

export interface ITeamsGames {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamHome: string,
  teamAway: string
}

export interface IMatchesLeaderboard {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome: { teamName: string; };
  teamAway: { teamName: string; };
}

export interface TeamsGames {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome: string;
  teamAway: string;
}

export interface ILeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}
