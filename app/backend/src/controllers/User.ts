import { Request, Response } from 'express';
import UserService from '../services/User';
import { ILoginRequest } from '../interfaces/routes/login';

export default class UserController {
  private _service: UserService;

  constructor(service = new UserService()) {
    this._service = service;
  }

  public userLogin = async (req: Request, res: Response) => {
    const { email, password }: ILoginRequest = req.body;

    const { code, data } = await this._service.userLogin(email, password);

    return res.status(code).json(data);
  };
}
