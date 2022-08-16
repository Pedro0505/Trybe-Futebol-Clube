import { UserRepository } from '../repositories';
import { IServiceReturnError, IServiceReturnSuccess } from '../interfaces/service';
import { ILoginResponse } from '../interfaces/routes/login';
import bcryptVerify from '../helpers/BcryptVerify';
import JwtGenerate from '../helpers/JwtGenerate';

const incorrectCredential: IServiceReturnError = {
  code: 401, data: { message: 'Incorrect email or password' },
};

export default class UserService {
  private _repository: UserRepository;

  constructor(repository = new UserRepository()) {
    this._repository = repository;
  }

  public async userLogin(email: string, password: string) {
    const user = await this._repository.getUserByEmail(email);

    if (!user) return incorrectCredential;

    const verify = await bcryptVerify(password, user.password);

    if (!verify) return incorrectCredential;

    const token = JwtGenerate({ email, id: user.user.id, role: user.user.role });

    const sucess: IServiceReturnSuccess<ILoginResponse> = {
      code: 200,
      data: { user: user.user, token },
    };

    return sucess;
  }
}
