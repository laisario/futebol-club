import { MatcherInterface } from './matchesInterface';

interface leaderboardTeamI {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency?: number,
}

interface LeaderboardServiceInterface {
  getTeamInfo: (matches: Array<MatcherInterface>) => leaderboardTeamI[];
}

export { leaderboardTeamI };
export default LeaderboardServiceInterface;
