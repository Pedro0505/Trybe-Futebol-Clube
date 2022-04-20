import { ILoginRequest } from '../interfaces/routes/login';
import Users from '../database/models/Users';

export default class TeamsRepository {
  private _lint: string;

  constructor() {
    this._lint = '';
  }

  async getUserByEmail(email: string): Promise<ILoginRequest | null> {
    this._lint = 'chato';

    const result = await Users.findOne({ where: { email } });

    return result;
  }
}
