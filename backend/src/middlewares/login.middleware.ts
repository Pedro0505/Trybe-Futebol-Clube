import { NextFunction, Request, Response } from 'express';
import LoginSchema from '../schemas/loginValidate';

const LoginValidate = (req: Request, res: Response, next: NextFunction) => {
  const { error } = LoginSchema.validate(req.body);

  if (error) {
    const [code, message] = error.message.split('|');
    const codeNum = +code;
    const validCode = Number.isNaN(codeNum) ? 400 : codeNum;
    return res.status(validCode).json({ message });
  }

  next();
};

export default LoginValidate;
