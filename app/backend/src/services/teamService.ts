import teamsModel from '../database/models/teams';

export default class teamService {
  constructor(private model = teamsModel) {}
  async getAll() {
    try {
      const response = await this.model.findAll();
      return response;
    } catch (error) {
      throw new Error('Não foi possível recuperar os times');
    }
  }
}
