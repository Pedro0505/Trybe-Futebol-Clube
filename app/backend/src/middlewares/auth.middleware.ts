import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IDecoded } from '../interfaces/helpers';
import { JWT_SECRET } from '../helpers/JwtGenerate';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ error: 'Token not found' });

  try {
    const decoded = jwt.verify(authorization, JWT_SECRET) as IDecoded;

    req.tokenData = decoded.tokenData;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export default auth;
