import { compare } from 'bcrypt';

const bcryptVerify = async (password: string, passwordDB: string) => {
  const verify = await compare(password, passwordDB);

  return verify;
};

export default bcryptVerify;
