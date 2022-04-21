import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import { app } from '../app';
import { UserRepository } from '../repositories';
import { invalidBodyLogin, invalidUserLogin, responseDB, validUserLogin } from './mock/users';
import { JWT_SECRET } from '../helpers/JwtGenerate';
import Users from '../database/models/Users';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota de login', () => {
  describe('POST /login', () => {
    describe('Testando caso de falha com senha invalida e sucesso', () => {
      before(() => {
        sinon.stub(Users, 'findOne').resolves(responseDB as Users);
      });
    
      after(() => {
        (Users.findOne as sinon.SinonStub).restore();
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
        sinon.stub(Users, 'findOne').resolves(null);
      });
    
      after(() => {
        (Users.findOne as sinon.SinonStub).restore();
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
  
  describe('GET /login/validate', () => {
    before(() => {
      sinon.stub(Users, 'findOne').resolves(responseDB as Users);
    });
  
    after(() => {
      (Users.findOne as sinon.SinonStub).restore();
    });

    it('Teste caso de sucesso do validate', async () => {
      const { body: { token } } = await chai.request(app).post('/login').send(validUserLogin);

      const { body, status } = await chai.request(app).get('/login/validate').set({ 'Authorization': token });

      expect(status).to.be.equal(200);
      expect(body).to.be.equal('admin');
    });

    it('Teste caso de falha do validate | Quando o token é invalido', async () => {
      const { body, status } = await chai.request(app).get('/login/validate').set({ 'Authorization': 'token' });

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ error: 'Invalid token' });
    });

    it('Teste caso de falha do validate | Quando o token não é enviado', async () => {
      const { body, status } = await chai.request(app).get('/login/validate');

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ error: 'Token not found' });
    });
  });
})