import { Router } from 'express';
import {
  LeaderboardController,
  MatchesController,
  TeamsController,
  UserController,
} from './controllers';
import {
  LeaderboardRepository,
  MatchesRepository,
  TeamsRepository,
  UserRepository,
} from './repositories';
import { LeaderboardRouter, MatchesRouter, TeamsRouter, UserRouter } from './routes';
import { LeaderboardService, MatchesService, TeamsService, UserService } from './services';

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

  public static get leaderboardRouter() {
    const repository = new LeaderboardRepository();
    const service = new LeaderboardService(repository);
    const controller = new LeaderboardController(service);
    const router = new LeaderboardRouter(Router(), controller);

    return router.route;
  }
}
