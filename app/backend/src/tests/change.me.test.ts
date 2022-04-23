import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import * as jwt from 'jsonwebtoken';
import { app } from '../app';
import { invalidBodyLogin, invalidUserLogin, responseDB, validUserLogin } from './mock/users';
import { JWT_SECRET } from '../helpers/JwtGenerate';
import Users from '../database/models/Users';
import Teams from '../database/models/Teams';
import { allTeams, oneTeam } from './mock/teams';
import { ITeams } from '../interfaces/routes/team';
import { allMatches, allMatchesFinished, allMatchesInProgress, equalTeamsResquest, notFoundTeam, requestCreateMatche, responseCreateMatche } from './mock/matches';
import { IMatchesTeams } from '../interfaces/routes/matches';
import Matches from '../database/models/Matches';

chai.use(chaiHttp);

const { expect } = chai;

describe('teste de integração', () => {
// describe('Teste da rota de login', () => {
//   describe('POST /login', () => {
//     describe('Testando caso de falha com senha invalida e sucesso', () => {
//       before(() => {
//         sinon.stub(Users, 'findOne').resolves(responseDB as Users);
//       });
    
//       after(() => {
//         (Users.findOne as sinon.SinonStub).restore();
//       });
    
//       it('Teste de caso de sucesso do login', async () => {
//         const { status, body } = await chai.request(app).post('/login').send(validUserLogin);
    
//         expect(status).to.be.equal(200);
//         expect(body).to.be.an('object');
//         expect(body.user).to.be.not.undefined;
//         expect(body.token).to.be.not.undefined;
//         expect(() => jwt.verify(body.token, JWT_SECRET)).to.not.throw();
//       });
    
//       it('Teste de caso de falha do login | Senha incorreta', async () => {
//         const { status, body } = await chai.request(app).post('/login').send(invalidUserLogin.wrongPassword);
    
//         expect(status).to.be.equal(401);
//         expect(body).to.be.an('object');
//         expect(body.message).to.be.not.undefined;
//         expect(body.message).to.be.equal('Incorrect email or password');
//       });
//     });
  
//     describe('Quando o email enviado é incorreto', () => {
//       before(() => {
//         sinon.stub(Users, 'findOne').resolves(null);
//       });
    
//       after(() => {
//         (Users.findOne as sinon.SinonStub).restore();
//       });
  
//       it('Email enviado errado', async () => {
//         const { status, body } = await chai.request(app).post('/login').send(invalidUserLogin.wrongEmail);
  
//         expect(status).to.be.equal(401);
//         expect(body).to.be.an('object');
//         expect(body.message).to.be.not.undefined;
//         expect(body.message).to.be.equal('Incorrect email or password');
//       });
//     });
  
//     describe('Quando o body é inválido', () => {
//       it('Email com o formato errado', async () => {
//         const { status, body } = await chai.request(app).post('/login').send(invalidBodyLogin.emailInvalid);
  
//         expect(status).to.be.equal(401);
//         expect(body.message).to.be.not.undefined;
//         expect(body.message).to.be.equal('Incorrect email or password');
//       });
  
//       it('Senha com menos de 6 caracteres', async () => {
//         const { status, body } = await chai.request(app).post('/login').send(invalidBodyLogin.passwordInvalid);
  
//         expect(status).to.be.equal(401);
//         expect(body.message).to.be.not.undefined;
//         expect(body.message).to.be.equal('Incorrect email or password');
//       });
  
//       it('Quando o email não é enviado', async () => {
//         const { status, body } = await chai.request(app).post('/login').send(invalidBodyLogin.noEmail);
  
//         expect(status).to.be.equal(400);
//         expect(body.message).to.be.not.undefined;
//         expect(body.message).to.be.equal('All fields must be filled');
//       });
  
//       it('Quando o email não é enviado', async () => {
//         const { status, body } = await chai.request(app).post('/login').send(invalidBodyLogin.noPassword);
  
//         expect(status).to.be.equal(400);
//         expect(body.message).to.be.not.undefined;
//         expect(body.message).to.be.equal('All fields must be filled');
//       });
  
//       it('Quando o email é enviado vazio', async () => {
//         const { status, body } = await chai.request(app).post('/login').send(invalidBodyLogin.emptyEmail);
  
//         expect(status).to.be.equal(400);
//         expect(body.message).to.be.not.undefined;
//         expect(body.message).to.be.equal('All fields must be filled');
//       });
  
//       it('Quando a senha é enviada vazia', async () => {
//         const { status, body } = await chai.request(app).post('/login').send(invalidBodyLogin.emptyPassword);
  
//         expect(status).to.be.equal(400);
//         expect(body.message).to.be.not.undefined;
//         expect(body.message).to.be.equal('All fields must be filled');
//       });
//     });
//   });
  
//   describe('GET /login/validate', () => {
//     before(() => {
//       sinon.stub(Users, 'findOne').resolves(responseDB as Users);
//     });
  
//     after(() => {
//       (Users.findOne as sinon.SinonStub).restore();
//     });

//     it('Teste caso de sucesso do validate', async () => {
//       const { body: { token } } = await chai.request(app).post('/login').send(validUserLogin);

//       const { body, status } = await chai.request(app).get('/login/validate').set({ 'Authorization': token });

//       expect(status).to.be.equal(200);
//       expect(body).to.be.equal('admin');
//     });

//     it('Teste caso de falha do validate | Quando o token é invalido', async () => {
//       const { body, status } = await chai.request(app).get('/login/validate').set({ 'Authorization': 'token' });

//       expect(status).to.be.equal(401);
//       expect(body).to.be.deep.equal({ error: 'Invalid token' });
//     });

//     it('Teste caso de falha do validate | Quando o token não é enviado', async () => {
//       const { body, status } = await chai.request(app).get('/login/validate');

//       expect(status).to.be.equal(401);
//       expect(body).to.be.deep.equal({ error: 'Token not found' });
//     });
//   });
// })

describe('Testando a rota de teams', () => {

  describe('GET /teams', () => {
    before(() => {
      sinon.stub(Teams, 'findAll').resolves(allTeams as Teams[]);
    });
  
    after(() => {
      (Teams.findAll as sinon.SinonStub).restore();
    });

    it('Testando caso de sucesso', async () => {
      const { status, body } = await chai.request(app).get('/teams');

      expect(status).to.be.equal(200);
      expect(body).to.be.an('array');
      expect(body).to.be.length(5);
      body.forEach((e: ITeams) => {
        expect(e).to.include.all.keys('id', 'teamName');
      });
    });
  });

  describe('GET /teams/:id', () => {
    before(() => {
      sinon.stub(Teams, 'findOne').resolves(oneTeam as Teams);
    });
  
    after(() => {
      (Teams.findOne as sinon.SinonStub).restore();
    });

    it('Testando caso de sucesso', async () => {
      const { status, body } = await chai.request(app).get('/teams/5');

      expect(status).to.be.equal(200);
      expect(body).to.be.an('object');
      expect(body.id).to.be.equal(5);
      expect(body.teamName).to.be.equal('Cruzeiro');
      expect(body).to.include.all.keys('id', 'teamName');
    });
  });

  describe('GET /teams/:id quando o time não é encontrado', () => {
    before(() => {
      sinon.stub(Teams, 'findOne').resolves(null);
    });
  
    after(() => {
      (Teams.findOne as sinon.SinonStub).restore();
    });

    it('Quando passa um id que não existe', async () => {
      const { status, body } = await chai.request(app).get('/teams/11111111');

      expect(status).to.be.equal(404);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'Team not found' });
    });
  });
});

describe('Testando a rota de matches', () => {

  describe('GET /matches', () => {
    before(() => {
      sinon.stub(Matches, 'findAll').resolves(allMatches as Matches[]);
    });
  
    after(() => {
      (Matches.findAll as sinon.SinonStub).restore();
    });

    it('Testando se a rota retorna todas as partidas', async () => {
      const { body, status } = await chai.request(app).get('/matches');

      expect(status).to.be.equal(200);
      expect(body).to.be.an('array');
      expect(body).to.be.length(3);
      body.forEach((e: IMatchesTeams) => {
        expect(e).to.include.all.keys('id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress', 'teamHome', 'teamAway');
      });
    })
  });

  describe('GET /matches?inProgress=true', () => {
    before(() => {
      sinon.stub(Matches, 'findAll').resolves(allMatchesInProgress as Matches[]);
    });
  
    after(() => {
      (Matches.findAll as sinon.SinonStub).restore();
    });

    it('Testando se todas as partidas estão em progresso',async () => {
      const { body, status } = await chai.request(app).get('/matches?inProgress=true');

      expect(status).to.be.equal(200);
      expect(body).to.be.an('array');
      expect(body).to.be.length(3);
      body.forEach((e: IMatchesTeams) => {
        expect(e).to.include.all.keys('id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress', 'teamHome', 'teamAway');
        expect(e.inProgress).to.be.true;
      });
    })
  })

  describe('GET /matches?inProgress=false', () => {
    before(() => {
      sinon.stub(Matches, 'findAll').resolves(allMatchesFinished as Matches[]);
    });
  
    after(() => {
      (Matches.findAll as sinon.SinonStub).restore();
    });

    it('Testando se todas as partidas estão terminadas',async () => {
      const { body, status } = await chai.request(app).get('/matches?inProgress=false');

      expect(status).to.be.equal(200);
      expect(body).to.be.an('array');
      expect(body).to.be.length(3);
      body.forEach((e: IMatchesTeams) => {
        expect(e).to.include.all.keys('id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress', 'teamHome', 'teamAway');
        expect(e.inProgress).to.be.false;
      });
    })
  })

  describe('POST /matches', () => {
    before(() => {
      sinon.stub(Users, 'findOne').resolves(responseDB as Users);
      sinon.stub(Teams, 'findAll').resolves(allTeams as Teams[]);
      sinon.stub(Matches, 'create').resolves(responseCreateMatche as Matches);
    });
  
    after(() => {
      (Users.findOne as sinon.SinonStub).restore();
      (Teams.findAll as sinon.SinonStub).restore();
      (Matches.create as sinon.SinonStub).restore();
    });

    it('Caso de sucesso da criacão da matche', async () => {
      const { body: { token } } = await chai.request(app).post('/login').send(validUserLogin);

      const { body, status } = await chai.request(app).post('/matches').send(requestCreateMatche).set({ 'Authorization': token });

      expect(status).to.be.equal(201);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal(responseCreateMatche);
    });

    it('Caso de falha da criacão da matche | Quando os times são iguais', async () => {
      const { body: { token } } = await chai.request(app).post('/login').send(validUserLogin);

      const { body, status } = await chai.request(app).post('/matches').send(equalTeamsResquest).set({ 'Authorization': token });

      expect(status).to.be.equal(401);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({message: 'It is not possible to create a match with two equal teams'});
    });

    it('Caso de falha da criacão da matche | Quando os times não existe', async () => {
      const { body: { token } } = await chai.request(app).post('/login').send(validUserLogin);

      const { body, status } = await chai.request(app).post('/matches').send(notFoundTeam).set({ 'Authorization': token });

      expect(status).to.be.equal(404);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'There is no team with such id!' });
    });
  });

  describe('PATCH /matches/:id/finish', () => {
    before(() => {
      sinon.stub(Matches, 'update').resolves(undefined);
    });
  
    after(() => {
      (Matches.update as sinon.SinonStub).restore();
    });

    it('Caso de sucesso de terminar uma partida', async () => {
      const { body, status } = await chai.request(app).patch('/matches/1/finish');

      expect(status).to.be.equal(200);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'Finished game' });
    });
  });

  describe('PATCH /matches/:id', () => {
    before(() => {
      sinon.stub(Matches, 'update').resolves(undefined);
    });
  
    after(() => {
      (Matches.update as sinon.SinonStub).restore();
    });

    it('Caso de sucesso de terminar uma partida', async () => {
      const { body, status } = await chai.request(app).patch('/matches/1');

      expect(status).to.be.equal(200);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'Updated game' });
    });
  });
});
});
