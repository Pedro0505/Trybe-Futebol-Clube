export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface IUserRepository {
  user: {
    id: number;
    username: string;
    role: string;
    email: string;
  }
  password: string;
}

export interface ILoginResponse {
  user: {
    id: number;
    username: string;
    role: string;
    email: string;
  };
  token: string;
}
