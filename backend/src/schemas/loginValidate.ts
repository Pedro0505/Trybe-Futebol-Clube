import * as Joi from 'joi';
import { ILoginRequest } from '../interfaces/routes/login';

const fieldsError = '400|All fields must be filled';

const LoginSchema = Joi.object<ILoginRequest>({
  email: Joi.string().email().required().messages({
    'any.required': fieldsError,
    'string.email': '401|Incorrect email or password',
    'string.empty': fieldsError,
  }),
  password: Joi.string().required().min(6).messages({
    'any.required': fieldsError,
    'string.min': '401|Incorrect email or password',
    'string.empty': fieldsError,
  }),
});

export default LoginSchema;
