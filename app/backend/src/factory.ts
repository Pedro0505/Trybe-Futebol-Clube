import { Router } from 'express';
import MatchesController from './controllers/Matches';
import TeamsController from './controllers/Teams';
import UserController from './controllers/User';
import { MatchesRepository, TeamsRepository, UserRepository } from './repositories';
import MatchesRouter from './routes/matches.routes';
import TeamsRouter from './routes/teams.routes';
import UserRouter from './routes/user.routes';
import MatchesService from './services/Matches';
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

  public static get matchesRouter() {
    const repository = new MatchesRepository();
    const service = new MatchesService(repository);
    const controller = new MatchesController(service);
    const router = new MatchesRouter(Router(), controller);

    return router.route;
  }
}
