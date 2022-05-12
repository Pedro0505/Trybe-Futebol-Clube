import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';
import Matches from '../database/models/Matches';
import { allResultsMatchs, leaderboardAwayResult, leaderboardHomeResult, matchesAll, matchesAway, matchesHome, teamsAll, teamsAway, teamsHome } from './mock/leaderboard';
import Teams from '../database/models/Teams';
import { ILeaderboard } from '../interfaces/helpers';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota de login', () => {
  describe('GET /leaderboard/home', () => {
    before(() => {
      sinon.stub(Matches, 'findAll').resolves(matchesHome as Matches[]);
      sinon.stub(Teams, 'findAll').resolves(teamsHome as Teams[]);
    });
  
    after(() => {
      sinon.restore();
    });

    it('Caso de sucesso do leaderboard home', async () => {
      const { body, status } = await chai.request(app).get('/leaderboard/home');

      expect(body).to.be.deep.equal(leaderboardHomeResult);
      expect(body).to.have.length(3);
      expect(status).to.be.equal(200);
      body.forEach((e: ILeaderboard) => {
        expect(e).to.include.all.keys('name', 'totalPoints', 'totalGames', 'totalVictories', 'totalDraws', 'totalLosses', 'goalsFavor', 'goalsOwn', 'goalsBalance', 'efficiency');
      });
    });
  });

  describe('GET /leaderboard/away', () => {
    before(() => {
      sinon.stub(Matches, 'findAll').resolves(matchesAway as Matches[]);
      sinon.stub(Teams, 'findAll').resolves(teamsAway as Teams[]);
    });
  
    after(() => {
      sinon.restore();
    });

    it('Caso de sucesso do leaderboard home', async () => {
      const { body, status } = await chai.request(app).get('/leaderboard/away');

      expect(body).to.be.deep.equal(leaderboardAwayResult);
      expect(body).to.have.length(3);
      expect(status).to.be.equal(200);
      body.forEach((e: ILeaderboard) => {
        expect(e).to.include.all.keys('name', 'totalPoints', 'totalGames', 'totalVictories', 'totalDraws', 'totalLosses', 'goalsFavor', 'goalsOwn', 'goalsBalance', 'efficiency');
      });
    });
  });

  describe('GET /leaderboard/away', () => {
    before(() => {
      sinon.stub(Matches, 'findAll').resolves(matchesAll as Matches[]);
      sinon.stub(Teams, 'findAll').resolves(teamsAll as Teams[]);
    });
  
    after(() => {
      sinon.restore();
    });

    it('Caso de sucesso do leaderboard home', async () => {
      const { body, status } = await chai.request(app).get('/leaderboard');

      expect(body).to.be.deep.equal(allResultsMatchs);
      expect(body).to.have.length(6);
      expect(status).to.be.equal(200);
      body.forEach((e: ILeaderboard) => {
        expect(e).to.include.all.keys('name', 'totalPoints', 'totalGames', 'totalVictories', 'totalDraws', 'totalLosses', 'goalsFavor', 'goalsOwn', 'goalsBalance', 'efficiency');
      });
    });
  });
})
