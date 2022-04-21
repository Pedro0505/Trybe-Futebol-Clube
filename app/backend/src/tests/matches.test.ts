import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../app';
import { MatchesRepository } from '../repositories';
import { allMatches, allMatchesFinished, allMatchesInProgress } from './fakeData/matches';
import { IMatchesTeams } from '../interfaces/routes/matches';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota de matches', () => {

  describe('GET /matches', () => {
    before(() => {
      sinon.stub(MatchesRepository.prototype, 'getAll').resolves(allMatches);
    });
  
    after(() => {
      (MatchesRepository.prototype.getAll as sinon.SinonStub).restore();
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
      sinon.stub(MatchesRepository.prototype, 'getMatchesInProgress').resolves(allMatchesInProgress);
    });
  
    after(() => {
      (MatchesRepository.prototype.getMatchesInProgress as sinon.SinonStub).restore();
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
      sinon.stub(MatchesRepository.prototype, 'getMatchesInProgress').resolves(allMatchesFinished);
    });
  
    after(() => {
      (MatchesRepository.prototype.getMatchesInProgress as sinon.SinonStub).restore();
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
