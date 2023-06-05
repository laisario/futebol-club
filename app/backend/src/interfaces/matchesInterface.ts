interface MatchesServiceInterface {
  getAll: (inProgressQuery: string | undefined) => Promise<MatcherInterface[]>;
  endMatche: (id: number) => Promise<void>;
  updateMatche: (id: number, homeTeamGoals: number, awayTeamGoals: number) => Promise<void>;
  createNewMatche: (reqBody: reqBodyInterface) => Promise<newMatcheInterface>;
}

interface reqBodyInterface {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

interface newMatcheInterface {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

interface MatcherInterface {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: number,
  homeTeam: HomeTeam,
  awayTeam: AwayTeam,
}

interface HomeTeam {
  teamName: string
}

interface AwayTeam {
  teamName: string
}

export { MatcherInterface, reqBodyInterface, newMatcheInterface };

export default MatchesServiceInterface;
