import { Router } from 'express';
import auth from '../middlewares/auth.middleware';
import MatchesController from '../controllers/Matches';
import IRoutes from '../interfaces/routes/route';

class MatchesRouter implements IRoutes {
  private _route: Router;

  private _controller: MatchesController;

  constructor(router = Router(), controller = new MatchesController()) {
    this._route = router;
    this._controller = controller;

    this._route.get('/', this._controller.getAll);

    this._route.post('/', auth, this._controller.create);

    this._route.patch('/:id/finish', this._controller.finishedMatches);

    this._route.patch('/:id', this._controller.updateMatches);
  }

  public get route(): Router {
    return this._route;
  }
}

export default MatchesRouter;
