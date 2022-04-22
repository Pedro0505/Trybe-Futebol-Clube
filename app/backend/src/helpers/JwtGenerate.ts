import * as fs from 'fs';
import * as path from 'path';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { IPayloadJwt } from '../interfaces/helpers';

const jwtConfig: jwt.SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

export const JWT_SECRET = fs.readFileSync(path.resolve(__dirname, '../../jwt.evaluation.key'), {
  encoding: 'utf-8',
});

export default (playload: IPayloadJwt) => jwt.sign({ tokenData: playload }, JWT_SECRET, jwtConfig);
