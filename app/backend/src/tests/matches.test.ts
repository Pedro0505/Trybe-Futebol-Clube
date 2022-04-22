import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';
import { allMatches, allMatchesFinished, allMatchesInProgress } from './mock/matches';
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
});
