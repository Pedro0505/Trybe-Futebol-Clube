import * as express from 'express';
import * as cors from 'cors';
import Factory from './factory';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(accessControl);
  }

  private routes() {
    this.app.use('/login', Factory.userRouter);
    this.app.use('/teams', Factory.teamsRouter);
    this.app.use('/matches', Factory.matchesRouter);
    this.app.use('/leaderboard', Factory.leaderboardRouter);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Server listen in port: ${PORT}`));
  }
}

export { App };

export const { app } = new App();
