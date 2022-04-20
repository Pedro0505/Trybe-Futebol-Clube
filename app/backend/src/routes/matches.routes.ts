import { Router } from 'express';
import MatchesController from '../controllers/Matches';
import IRoutes from '../interfaces/routes/route';

class MatchesRouter implements IRoutes {
  private _route: Router;

  private _controller: MatchesController;

  constructor(router = Router(), controller = new MatchesController()) {
    this._route = router;
    this._controller = controller;

    this._route.get(
      '/',
      this._controller.getAll,
    );
  }

  public get route(): Router {
    return this._route;
  }
}

export default MatchesRouter;
