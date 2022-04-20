import { Request, Response } from 'express';
import MatchesService from '../services/Matches';

export default class MatchesController {
  private _service: MatchesService;

  constructor(service = new MatchesService()) {
    this._service = service;
  }

  public getAll = async (_req: Request, res: Response) => {
    const { code, data } = await this._service.getAll();

    return res.status(code).json(data);
  };
}
