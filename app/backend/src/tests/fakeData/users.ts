export const responseDB = {
  user: {
    id: 1,
    username: 'random',
    role: 'admin',
    email: 'random@person.com',
  },
  password: '$2a$12$RuNoPGBCBgRg9a.K82PE/u6vIRnpIwqjlF9UxBd6IRg5wDE12FUA2',
};

export const validUserLogin = {
  email: 'random@person.com',
  password: '12345678',
};

export const invalidUserLogin = {
  wrongPassword: {
    email: 'random@person.com',
    password: 'wrong_pass',
  },
  wrongEmail: {
    email: 'wrong@email.com',
    password: '12345678',
  }
};

export const invalidBodyLogin = {
  emailInvalid: {
    email: 'random.com',
    password: '12345678',
  },
  passwordInvalid: {
    email: 'random@person.com',
    password: '1234',
  },
  noPassword: {
    email: 'random@person.com',
  },
  noEmail: {
    password: '12345678'
  },
  emptyEmail: {
    email: '',
    password: '12345678',
  },
  emptyPassword: {
    email: 'random@person.com',
    password: '',
  }
};
