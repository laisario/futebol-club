import { Request, Response } from 'express';
import MatchesServiceInterface from '../interfaces/matchesInterface';
import LeaderboardServiceInterface from '../interfaces/leaderboardInterface';

export default class LeaderboardController {
  constructor(
    private matchesService: MatchesServiceInterface,
    private leaderboardService: LeaderboardServiceInterface,
  ) {
  }

  getHomeInfo = async (req: Request, res: Response) => {
    const matches = await this.matchesService.getAll('false');
    const leaderboard = await this.leaderboardService.getTeamInfo(matches);
    return res.status(200).json(leaderboard);
  };
}
