import Joi from 'joi';
import { ILoginRequest } from '../interfaces/routes/login';

const LoginSchema = Joi.object<ILoginRequest>({
  email: Joi.string().email().required().messages({
    'any.required': '400|All fields must be filled',
  }),
  password: Joi.string().required().min(6).messages({
    'any.required': '400|All fields must be filled',
    'string.min': '400|Password must be 6 characters or more',
  }),
});

export default LoginSchema;
