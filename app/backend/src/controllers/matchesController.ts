import { Request, Response } from 'express';
import MatchesServiceInterface from '../interfaces/matchesInterface';

export default class MatchesController {
  constructor(private matchesService: MatchesServiceInterface) {
  }

  public async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const test = inProgress as string | undefined;
    const matches = await this.matchesService.getAll(test);
    return res.status(200).json(matches);
  }

  public async endMatche(req: Request, res: Response) {
    const { id } = req.params;
    await this.matchesService.endMatche(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }

  public async updateMatche(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchesService
      .updateMatche(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));
    return res.status(200).json({ message: 'Updated' });
  }

  public async createNewMatche(req: Request, res: Response) {
    const newMatche = await this.matchesService.createNewMatche(req.body);
    return res.status(201).json(newMatche);
  }
}
