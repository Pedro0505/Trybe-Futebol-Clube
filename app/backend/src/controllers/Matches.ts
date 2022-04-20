import { Request, Response } from 'express';
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
}
