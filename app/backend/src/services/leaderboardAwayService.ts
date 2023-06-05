import { leaderboardTeamI } from '../interfaces/leaderboardInterface';
import { MatcherInterface } from '../interfaces/matchesInterface';

const totalPoints = (homeGoals: number, awayGoals: number) => {
  if (homeGoals === awayGoals) return 1;
  return homeGoals < awayGoals ? 3 : 0;
};

const firstLeaderboard = (acc: leaderboardTeamI[], currMatche: MatcherInterface) => [...acc, {
  name: currMatche.awayTeam.teamName,
  totalPoints: totalPoints(currMatche.homeTeamGoals, currMatche.awayTeamGoals),
  totalGames: 1,
  totalVictories: currMatche.homeTeamGoals < currMatche.awayTeamGoals ? 1 : 0,
  totalDraws: currMatche.homeTeamGoals === currMatche.awayTeamGoals ? 1 : 0,
  totalLosses: currMatche.homeTeamGoals > currMatche.awayTeamGoals ? 1 : 0,
  goalsFavor: currMatche.awayTeamGoals,
  goalsOwn: currMatche.homeTeamGoals,
  goalsBalance: 0,
}];

const leaderboardArray = (info: leaderboardTeamI, currMatche: MatcherInterface) => ({
  ...info,
  totalPoints: info.totalPoints + totalPoints(currMatche.homeTeamGoals, currMatche.awayTeamGoals),
  totalGames: info.totalGames + 1,
  totalVictories: info.totalVictories
    + (currMatche?.homeTeamGoals < currMatche.awayTeamGoals ? 1 : 0),
  totalDraws: info.totalDraws + (currMatche?.homeTeamGoals === currMatche.awayTeamGoals ? 1 : 0),
  totalLosses: info.totalLosses + (currMatche?.homeTeamGoals > currMatche.awayTeamGoals ? 1 : 0),
  goalsFavor: info.goalsFavor + currMatche.awayTeamGoals,
  goalsOwn: info.goalsOwn + currMatche.homeTeamGoals,
  goalsBalance: 0,
});

function desempate(times: Array<leaderboardTeamI>): Array<leaderboardTeamI> {
  return times.sort((a, b) => {
    if (a.totalPoints !== b.totalPoints) {
      return b.totalPoints - a.totalPoints;
    } if (a.totalVictories !== b.totalVictories) {
      return b.totalVictories - a.totalVictories;
    } if (a.goalsBalance !== b.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }
    return b.goalsFavor - a.goalsFavor;
  });
}

export default class LeaderboardAwayService {
  static getTeamInfo = (matches: Array<MatcherInterface>): Array<leaderboardTeamI> => {
    const leaderboard = matches.reduce((acc: leaderboardTeamI[], currMatche) => {
      const awayTeam = acc.find((info) => info.name === currMatche.awayTeam?.teamName);
      if (!awayTeam) {
        return firstLeaderboard(acc, currMatche);
      }
      return acc.map((info) => {
        if (info.name === currMatche.awayTeam?.teamName) {
          return leaderboardArray(info, currMatche);
        }
        return info;
      });
    }, []) as unknown as Array<leaderboardTeamI>;
    const leaderboardComplete = leaderboard.map((team) => ({
      ...team,
      goalsBalance: team.goalsFavor - team.goalsOwn,
      efficiency: Number(((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2)),
    }));
    return desempate(leaderboardComplete);
  };
}
