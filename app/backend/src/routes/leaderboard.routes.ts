import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard';
import IRoutes from '../interfaces/routes/route';

class LeaderboardRouter implements IRoutes {
  private _route: Router;

  private _controller: LeaderboardController;

  constructor(router = Router(), controller = new LeaderboardController()) {
    this._route = router;
    this._controller = controller;

    this.route.get('/', this._controller.createLeaderboardAll);
    this.route.get('/home', this._controller.createLeaderboardHome);
    this.route.get('/away', this._controller.createLeaderboardAway);
  }

  public get route(): Router {
    return this._route;
  }
}

export default LeaderboardRouter;
