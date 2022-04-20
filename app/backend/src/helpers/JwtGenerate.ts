import fs from 'fs';
import path from 'path';
import jwt, { SignOptions } from 'jsonwebtoken';
import 'dotenv/config';
import { IPayloadJwt } from '../interfaces/helpers';

const jwtConfig: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const JWT_SECRET = fs.readFileSync(path.resolve(__dirname, '../../jwt.evaluation.key'), {
  encoding: 'utf-8',
});

export default (playload: IPayloadJwt) => jwt.sign({ tokenData: playload }, JWT_SECRET, jwtConfig);
