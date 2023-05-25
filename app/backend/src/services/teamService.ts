import TeamsModel from '../database/models/teams';

export default class TeamService {
  constructor(private model = TeamsModel) {}
  async getAll() {
    try {
      const response = await this.model.findAll();
      console.log(response);
      return response;
    } catch (error) {
      throw new Error('Não foi possível recuperar os times');
    }
  }
}
