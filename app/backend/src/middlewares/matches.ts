import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/teamService';

const teamService = new TeamService();

const validateTeamExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (Number(req.body.awayTeamId) === Number(req.body.homeTeamId)) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const homeTeam = await teamService.getById(Number(req.body.homeTeamId));
    const awayTeam = await teamService.getById(Number(req.body.awayTeamId));
    if (!homeTeam || !awayTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
  } catch (_e) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
};

export default validateTeamExists;
