import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import { app } from '../app';
import { UserRepository } from '../repositories';
import { invalidBodyLogin, invalidUserLogin, responseDB, validUserLogin } from './fakeData/users';
import { JWT_SECRET } from '../helpers/JwtGenerate';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  describe('Testando caso de falha com senha invalida e sucesso', () => {
    before(() => {
      sinon.stub(UserRepository.prototype, 'getUserByEmail').resolves(responseDB);
    });
  
    after(() => {
      (UserRepository.prototype.getUserByEmail as sinon.SinonStub).restore();
    });
  
    it('Teste de caso de sucesso do login', async () => {
      const { status, body } = await chai.request(app).post('/login').send(validUserLogin);
  
      expect(status).to.be.equal(200);
      expect(body).to.be.an('object');
      expect(body.user).to.be.not.undefined;
      expect(body.token).to.be.not.undefined;
      expect(() => jwt.verify(body.token, JWT_SECRET)).to.not.throw();
    });
  
    it('Teste de caso de falha do login | Senha incorreta', async () => {
      const { status, body } = await chai.request(app).post('/login').send(invalidUserLogin.wrongPassword);
  
      expect(status).to.be.equal(401);
      expect(body).to.be.an('object');
      expect(body.message).to.be.not.undefined;
      expect(body.message).to.be.equal('Incorrect email or password');
    });
  });

  describe('Quando o email enviado é incorreto', () => {
    before(() => {
      sinon.stub(UserRepository.prototype, 'getUserByEmail').resolves(null);
    });
  
    after(() => {
      (UserRepository.prototype.getUserByEmail as sinon.SinonStub).restore();
    });

    it('Email enviado errado', async () => {
      const { status, body } = await chai.request(app).post('/login').send(invalidUserLogin.wrongEmail);

      expect(status).to.be.equal(401);
      expect(body).to.be.an('object');
      expect(body.message).to.be.not.undefined;
      expect(body.message).to.be.equal('Incorrect email or password');
    });
  });

  describe('Quando o body é inválido', () => {
    it('Email com o formato errado', async () => {
      const { status, body } = await chai.request(app).post('/login').send(invalidBodyLogin.emailInvalid);

      expect(status).to.be.equal(401);
      expect(body.message).to.be.not.undefined;
      expect(body.message).to.be.equal('Incorrect email or password');
    });

    it('Senha com menos de 6 caracteres', async () => {
      const { status, body } = await chai.request(app).post('/login').send(invalidBodyLogin.passwordInvalid);

      expect(status).to.be.equal(401);
      expect(body.message).to.be.not.undefined;
      expect(body.message).to.be.equal('Incorrect email or password');
    });

    it('Quando o email não é enviado', async () => {
      const { status, body } = await chai.request(app).post('/login').send(invalidBodyLogin.noEmail);

      expect(status).to.be.equal(400);
      expect(body.message).to.be.not.undefined;
      expect(body.message).to.be.equal('All fields must be filled');
    });

    it('Quando o email não é enviado', async () => {
      const { status, body } = await chai.request(app).post('/login').send(invalidBodyLogin.noPassword);

      expect(status).to.be.equal(400);
      expect(body.message).to.be.not.undefined;
      expect(body.message).to.be.equal('All fields must be filled');
    });

    it('Quando o email é enviado vazio', async () => {
      const { status, body } = await chai.request(app).post('/login').send(invalidBodyLogin.emptyEmail);

      expect(status).to.be.equal(400);
      expect(body.message).to.be.not.undefined;
      expect(body.message).to.be.equal('All fields must be filled');
    });

    it('Quando a senha é enviada vazia', async () => {
      const { status, body } = await chai.request(app).post('/login').send(invalidBodyLogin.emptyPassword);

      expect(status).to.be.equal(400);
      expect(body.message).to.be.not.undefined;
      expect(body.message).to.be.equal('All fields must be filled');
    });
  });
});
