import { Request, Response } from 'express';
// import TeamService from '../services/teamService';
import TeamServiceInterface from '../interfaces/teamInterfaces';

export default class TeamController {
  constructor(private teamService: TeamServiceInterface) {
  }

  public async getAll(req: Request, res: Response) {
    try {
      const teams = await this.teamService.getAll();
      return res.status(200).json(teams);
    } catch (erro) {
      return res.status(500).json({ error: 'Não foi possível recuperar os times' });
    }
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const team = await this.teamService.getById(Number(id));
      return res.status(200).json(team);
    } catch (erro) {
      return res.status(500).json({ error: 'Não foi possível recuperar o time' });
    }
  }
}
