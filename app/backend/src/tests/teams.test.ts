import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import TeamService from '../services/teamService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams Router', () => {
  const teams = [
    {
      "id": 1,
      "teamName": "Avaí/Kindermann"
    },
    {
      "id": 2,
      "teamName": "Bahia"
    },
    {
      "id": 3,
      "teamName": "Botafogo"
    },
    {
      "id": 4,
      "teamName": "Corinthians"
    },
    {
      "id": 5,
      "teamName": "Cruzeiro"
    },
    {
      "id": 6,
      "teamName": "Ferroviária"
    },
    {
      "id": 7,
      "teamName": "Flamengo"
    },
    {
      "id": 8,
      "teamName": "Grêmio"
    },
    {
      "id": 9,
      "teamName": "Internacional"
    },
    {
      "id": 10,
      "teamName": "Minas Brasília"
    },
    {
      "id": 11,
      "teamName": "Napoli-SC"
    },
    {
      "id": 12,
      "teamName": "Palmeiras"
    },
    {
      "id": 13,
      "teamName": "Real Brasília"
    },
    {
      "id": 14,
      "teamName": "Santos"
    },
    {
      "id": 15,
      "teamName": "São José-SP"
    },
    {
      "id": 16,
      "teamName": "São Paulo"
    }
  ]

  afterEach(() => {
    sinon.restore();
  });
  
  describe('GET /teams', () => {
    describe('Requisição bem sucedida', function () {
      it('status 200 e times', async function () {
        const response = await chai.request(app).get('/teams');
        expect(response.status).to.be.equal(200);
        expect(response.body).to.deep.equal(teams);
      });    
    });
    // describe('Requisição mal sucedida', function () {
    //   it('status 500 e mensagem de erro', async function () {
    //     const response = await chai.request(app).get('/teams');
    //     // sinon.stub(TeamService, ).resolves(undefined)
    //     expect(response.status).to.be.equal(500);
    //     expect(response.body).to.deep.equal('Não foi possível recuperar os times');
    //   });    
    // });
  })

  describe('GET /teams/id', () => {
    describe('Requisição bem sucedida', function () {
      it('status 200 e time', async function () {
      
        const response = await chai.request(app).get('/teams/1');
        expect(response.status).to.be.equal(200);
        expect(response.body).to.deep.equal(teams[0]);
      });    
    });
    // describe('Requisição mal sucedida', function () {
    //   it('status 500 e mensagem de erro', async function () {
    //     const response = await chai.request(app).get('/teams/1');
    //     sinon.stub(TeamService, 'getById').resolves(undefined)
    //     expect(response.status).to.be.equal(500);
    //     expect(response.body).to.deep.equal('Não foi possível recuperar o time');
    //   });    
    // });
  })
});