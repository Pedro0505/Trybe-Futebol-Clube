import { Router } from 'express';
import TeamsController from '../controllers/Teams';
import IRoutes from '../interfaces/routes/route';

class TeamsRouter implements IRoutes {
  private _route: Router;

  private _controller: TeamsController;

  constructor(router = Router(), controller = new TeamsController()) {
    this._route = router;
    this._controller = controller;

    this._route.get(
      '/',
      this._controller.getAll,
    );

    this._route.get(
      '/:id',
      this._controller.getById,
    );
  }

  public get route(): Router {
    return this._route;
  }
}

export default TeamsRouter;
