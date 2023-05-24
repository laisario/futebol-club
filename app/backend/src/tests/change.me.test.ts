import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
  afterEach(() => {
    sinon.restore(); // Restaura os stubs após cada teste
  });
  
  it('Testa se o endpoint /teams retornar os times', async() => {
    const teamsMock = [
      { id: 1, nome: 'Flamengo' },
      { id: 2, nome: 'Vasco' },
      { id: 3, nome: 'Fluminense' },
    ];

    const stubTeams = sinon.stub().returns(teamsMock);

    app.get('/teams', stubTeams);
    const response = await chai.request(app).get('/teams');
    console.log(response)
    
    expect(response).to.have.status(200);
    expect(response).to.be.json;

    expect(response.body).to.be.an('array');
    response.body.forEach((team: any) => {
      expect(team).to.have.keys('id', 'name');
    });
  });
});
