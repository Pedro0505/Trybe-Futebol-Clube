import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { IDecoded } from '../interfaces/helpers';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ error: 'Token not found' });

  const JWT_SECRET = fs.readFileSync(path.resolve(__dirname, '../../jwt.evaluation.key'), {
    encoding: 'utf-8',
  });

  try {
    const decoded = jwt.verify(authorization, JWT_SECRET) as IDecoded;

    req.tokenData = decoded.tokenData;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export default auth;
