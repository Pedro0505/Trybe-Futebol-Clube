import { JwtPayload } from 'jsonwebtoken';

export interface IPayloadJwt {
  id?: number;
  email: string;
  role: string;
}

export interface IDecoded extends JwtPayload {
  tokenData: IPayloadJwt
}
