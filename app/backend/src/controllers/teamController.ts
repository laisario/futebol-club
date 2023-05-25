import { Request, Response } from 'express';
import TeamService from '../services/teamService';
import TeamsModel from '../database/models/teams';
import TeamServiceInterface from '../interfaces/teamInterfaces';

export default class TeamController {
  constructor(private service: TeamServiceInterface) {
    this.service = new TeamService(TeamsModel);
  }

  public async getAll(req: Request, res: Response) {
    try {
      const teams = await this.service.getAll();
      return res.status(200).json(teams);
    } catch (erro) {
      return res.status(500).json({ error: 'Não foi possível recuperar os times' });
    }
  }
}
