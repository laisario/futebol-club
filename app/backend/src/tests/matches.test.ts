import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;


describe('Router Matches', () => {
  afterEach(() => {
    sinon.restore();
  });
  const firstMatche = {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    home_team_id: 16,
    away_team_id: 8,
    homeTeam: {
      teamName: 'São Paulo'
    },
    awayTeam: {
      teamName: 'Grêmio'
    }
  }

  describe('GET /matches', () => {
    describe('Requisição bem sucedida', function () {
      it('status 200 e matches', async function () {
        const response = await chai.request(app).get('/matches');
        expect(response.status).to.be.equal(200);
        expect(response.body[0]).to.be.deep.equal(firstMatche);
      });
    });
  })
  // describe('PATCH /matches/:id/finish', () => {
  //   describe('Requisição bem sucedida', function () {
  //     it('status 200 e message Finished', async function () {
  //       const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY4NjA1NDA4MX0.FxHavT98JyTRmo93paz9LWgbh36rTuy7KWweuIrU02U';
  //       const response = await chai.request(app).patch('matches/43/finish').set('authorization', token);
  //       expect(response.status).to.be.equal(200);
  //       expect(response.body).to.be.equal({ message: "Finished" });
  //     });
  //   });
  // })
  describe('PATCH /matches/:id', () => {
    describe('Requisição bem sucedida', function () {
      it('status 200 e matche atualizada', async function () {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY4NjA1NDA4MX0.FxHavT98JyTRmo93paz9LWgbh36rTuy7KWweuIrU02U';
        const response = await chai.request(app).patch('matches/1').set('authorization', token).send({
          homeTeamGoals: 5,
          awayTeamGoals: 3
        });
        expect(response.status).to.be.equal(200);
      });
    });
  })
})
