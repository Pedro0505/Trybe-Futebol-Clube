import { Router } from 'express';
import LoginValidate from '../middlewares/login.middleware';
import UserController from '../controllers/User';
import IRoutes from '../interfaces/routes/route';
import auth from '../middlewares/auth.middleware';

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

    this._route.get(
      '/validate',
      auth,
      this._controller.validateUser,
    );
  }

  public get route(): Router {
    return this._route;
  }
}

export default UserRouter;
