import { Router } from 'express';
import UserController from './controllers/User';
import { UserRepository } from './repositories';
import UserRouter from './routes/user.routes';
import UserService from './services/User';

export default class Factory {
  public static get userRouter() {
    const repository = new UserRepository();
    const service = new UserService(repository);
    const controller = new UserController(service);
    const router = new UserRouter(Router(), controller);

    return router.route;
  }
}
