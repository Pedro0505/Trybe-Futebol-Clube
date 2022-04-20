import { Router } from 'express';
import LoginValidate from '../middlewares/login.middleware';
import UserController from '../controllers/User';
import IRoutes from '../interfaces/routes/route';

class UserRouter implements IRoutes {
  private _route: Router;

  private _controller: UserController;

  constructor(router = Router(), controller = new UserController()) {
    this._route = router;
    this._controller = controller;

    this._route.post(
      '/',
      LoginValidate,
      this._controller.userLogin,
    );
  }

  public get route(): Router {
    return this._route;
  }
}

export default UserRouter;
