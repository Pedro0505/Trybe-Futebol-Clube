import { Request, Response } from 'express';
import TeamsService from '../services/Teams';

export default class TeamsController {
  private _service: TeamsService;

  constructor(service = new TeamsService()) {
    this._service = service;
  }

  public getAll = async (_req: Request, res: Response) => {
    const { code, data } = await this._service.getAll();

    return res.status(code).json(data);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { code, data } = await this._service.getById(id as string);

    return res.status(code).json(data);
  };
}
