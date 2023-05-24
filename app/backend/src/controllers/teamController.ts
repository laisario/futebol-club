import { Request, Response } from 'express';
import teamService from '../services/teamService';
import teamsModel from '../database/models/teams';

export default class teamController {
  constructor(private Service = teamService) {
    this.Service = new Service(teamsModel);
  }

  public async getAll(req: Request, res: Response) {
    try {
      const teams = await this.Service.getAll();
      return res.status(200).json(teams);
    } catch (erro) {
      return res.status(500).json({ error: 'Não foi possível recuperar os times' });
    }
  }
}
