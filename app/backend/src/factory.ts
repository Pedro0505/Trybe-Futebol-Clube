import { Router } from 'express';
import TeamsController from './controllers/Teams';
import UserController from './controllers/User';
import { TeamsRepository, UserRepository } from './repositories';
import TeamsRouter from './routes/teams.routes';
import UserRouter from './routes/user.routes';
import TeamsService from './services/Teams';
import UserService from './services/User';

export default class Factory {
  public static get userRouter() {
    const repository = new UserRepository();
    const service = new UserService(repository);
    const controller = new UserController(service);
    const router = new UserRouter(Router(), controller);

    return router.route;
  }

  public static get teamsRouter() {
    const repository = new TeamsRepository();
    const service = new TeamsService(repository);
    const controller = new TeamsController(service);
    const router = new TeamsRouter(Router(), controller);

    return router.route;
  }
}
