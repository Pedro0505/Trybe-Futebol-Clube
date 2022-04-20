import { IUser, IUserRepository } from '../interfaces/routes/login';
import Users from '../database/models/Users';

export default class UserRepository {
  constructor(private _model = Users) {}

  async getUserByEmail(userEmail: string): Promise<IUserRepository | null> {
    const {
      email,
      id,
      password,
      role,
      username,
    } = await this._model.findOne({ where: { email: userEmail } }) as IUser;

    return { user: { email, id, role, username }, password };
  }
}
