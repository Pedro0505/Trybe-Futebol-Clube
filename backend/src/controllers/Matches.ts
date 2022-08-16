import { Request, Response } from 'express';
import { IMatcheCreateRequest } from '../interfaces/routes/matches';
import MatchesService from '../services/Matches';

export default class MatchesController {
  private _service: MatchesService;

  constructor(service = new MatchesService()) {
    this._service = service;
  }

  public getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    const { code, data } = await this._service.getAll(inProgress as string);

    return res.status(code).json(data);
  };

  public create = async (req: Request, res: Response) => {
    const { awayTeam,
      homeTeam,
      awayTeamGoals,
      homeTeamGoals,
      inProgress } = req.body as IMatcheCreateRequest;

    const { code, data } = await this._service.create({
      awayTeam,
      homeTeam,
      awayTeamGoals,
      homeTeamGoals,
      inProgress,
    });

    return res.status(code).json(data);
  };

  public finishedMatches = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this._service.finishedMatches(id as string);

    return res.status(200).json({ message: 'Finished game' });
  };

  public updateMatches = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    await this._service.updateMatches({ homeTeamGoals, awayTeamGoals }, id as string);

    return res.status(200).json({ message: 'Updated game' });
  };
}
