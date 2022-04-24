import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard';

export default class LeaderboardController {
  private _service: LeaderboardService;

  constructor(service = new LeaderboardService()) {
    this._service = service;
  }

  public createLeaderboardHome = async (_req: Request, res: Response) => {
    const leaderboard = await this._service.createHomeLeaderboard();

    return res.status(200).json(leaderboard);
  };

  public createLeaderboardAway = async (_req: Request, res: Response) => {
    const leaderboard = await this._service.creatAwayLeaderboard();

    return res.status(200).json(leaderboard);
  };
}
