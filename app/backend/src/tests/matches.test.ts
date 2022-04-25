import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';
import { responseDB, validUserLogin } from './mock/users';
import Users from '../database/models/Users';
import Teams from '../database/models/Teams';
import { allTeams } from './mock/teams';
import { allMatches, allMatchesFinished, allMatchesInProgress, equalTeamsResquest, notFoundTeam, requestCreateMatche, responseCreateMatche } from './mock/matches';
import { IMatchesTeams } from '../interfaces/routes/matches';
import Matches from '../database/models/Matches';

chai.use(chaiHttp);

const { expect } = chai;

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