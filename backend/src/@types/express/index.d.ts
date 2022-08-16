import { IPayloadJwt } from '../../interfaces/helpers/index';

declare global {
  namespace Express {
    interface Request {
      tokenData: IPayloadJwt;
    }
  }
}
