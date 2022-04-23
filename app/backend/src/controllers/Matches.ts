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
    const match = req.body as IMatcheCreateRequest;

    const { code, data } = await this._service.create(match);

    return res.status(code).json(data);
  };

  public finishedMatches = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this._service.finishedMatches(id as string);

    return res.status(200).json({ message: 'Finished game' });
  };
}
