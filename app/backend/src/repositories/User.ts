import { IUser, IUserRepository } from '../interfaces/routes/login';
import Users from '../database/models/Users';

export default class UserRepository {
  constructor(private _model = Users) {}

  async getUserByEmail(userEmail: string): Promise<IUserRepository | null> {
    const user = await this._model.findOne({ where: { email: userEmail } }) as IUser | null;

    if (!user) return null;

    return {
      user: {
        email: user.email,
        id: user.id,
        role: user.role,
        username: user.username,
      },
      password: user.password,
    };
  }
}
