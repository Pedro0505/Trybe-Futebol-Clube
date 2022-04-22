import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../app';
import Teams from '../database/models/Teams';
import { allTeams, oneTeam } from './mock/teams';
import { ITeams } from '../interfaces/routes/team';

chai.use(chaiHttp);

const { expect } = chai;

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
