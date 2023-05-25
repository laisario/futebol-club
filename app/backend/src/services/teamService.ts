import Teams from '../database/models/teams';
import { TeamInterface } from '../interfaces/teamInterfaces';

export default class TeamService {
  constructor(private model = Teams) { }
  async getAll(): Promise<TeamInterface[]> {
    try {
      const response = await this.model.findAll();
      return response;
    } catch (error) {
      throw new Error('Não foi possível recuperar os times to no service');
    }
  }

  async getById(id: number): Promise<TeamInterface | null> {
    try {
      const response = await this.model.findByPk(id);
      return response;
    } catch (error) {
      throw new Error('Não foi possível recuperar os times to no service');
    }
  }
}
