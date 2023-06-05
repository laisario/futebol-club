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

describe('Login Router', () => {
  afterEach(() => {
    sinon.restore();
  });
  
  describe('POST /login', () => {
    describe('Requisição bem sucedida', function () {
      const user = {
        "email": "admin@admin.com",
        "password": "secret_admin"
      };
      it('status 200 e token', async function () {
        const response = await chai.request(app).post('/login').send(user);
        expect(response.status).to.be.equal(200);
      });    
    });
    describe("Requisição mal sucedida" , function () {
      it('status 401 e erro campos inválidos', async function () {
        const user = {
          "email": "adminadmin.co",
          "password": "se"
        };
        const response = await chai.request(app).post('/login').send(user);
        expect(response.status).to.be.equal(401);
        expect(response.body).to.deep.equal({ "message": "Invalid email or password" });
       });    
       it('status 400 e erro campos precisam estar preenchidos', async function () {
        const user = {
          "email": "",
          "password": "secret_admin"
        };
        const response = await chai.request(app).post('/login').send(user);
        expect(response.status).to.be.equal(400);
        expect(response.body).to.deep.equal({ "message": "All fields must be filled" });
       });      
    })
  });

  describe('GET /login/role', () => {
    describe("Requisicação bem sucedida", function () {
      it('status 200 e role', async function () {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY4NTk3NDU4MX0.N3EePrw-3TOjZkQprfSLIKz4L3ucreWjnbygIZNHx88';
        const response = await chai.request(app).get('/login/role').set('authorization', token)

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({
          "role": "admin"
        });
      });    
    })
    describe("Requisicação mal sucedida", function () {
      it('status 401 e erro token precisa ser válido', async function () {
        const token = 'salsicha';
        const response = await chai.request(app).get('/login/role').set('authorization', token)

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({
          "message": "Token must be a valid token"
        });
      });   
      it('status 401 e erro token não encontrado', async function () {
        const token = 'salsicha';
        const response = await chai.request(app).get('/login/role')

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({
          "message": "Token not found"
        });
      });   
    })
  })
});
