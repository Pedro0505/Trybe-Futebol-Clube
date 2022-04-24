import { Router } from 'express';
import LeaderboardController from './controllers/Leaderboard';
import MatchesController from './controllers/Matches';
import TeamsController from './controllers/Teams';
import UserController from './controllers/User';
import { LeaderboardRepository,
  MatchesRepository,
  TeamsRepository,
  UserRepository } from './repositories';
import LeaderboardRouter from './routes/leaderboard.routes';
import MatchesRouter from './routes/matches.routes';
import TeamsRouter from './routes/teams.routes';
import UserRouter from './routes/user.routes';
import LeaderboardService from './services/Leaderboard';
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

  public static get leaderboardRouter() {
    const repository = new LeaderboardRepository();
    const service = new LeaderboardService(repository);
    const controller = new LeaderboardController(service);
    const router = new LeaderboardRouter(Router(), controller);

    return router.route;
  }
}
