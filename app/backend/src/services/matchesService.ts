import {
  MatcherInterface,
  reqBodyInterface,
  newMatcheInterface,
} from '../interfaces/matchesInterface';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

interface params {
  include: Array<include>;
  where?: { inProgress: boolean };
}

interface include {
  model: typeof Teams,
  as: string,
  attributes: { exclude: Array<string> }
}

export default class MatchesService {
  constructor(private model = Matches) { }
  async getAll(inProgressQuery: string | undefined): Promise<MatcherInterface[]> {
    const params = {
      include: [
        {
          model: Teams,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: Teams,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    } as params;
    if (inProgressQuery === 'true') params.where = { inProgress: true };
    if (inProgressQuery === 'false') params.where = { inProgress: false };
    const response = await this.model.findAll(params);
    return response as unknown as MatcherInterface[];
  }

  async endMatche(id: number): Promise<void> {
    const response = await this.model.findByPk(id);
    if (response) await response.update({ inProgress: false });
  }

  async updateMatche(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void> {
    const response = await this.model.findByPk(id);
    if (response) await response.update({ homeTeamGoals, awayTeamGoals });
  }

  async createNewMatche(reqBody: reqBodyInterface): Promise<newMatcheInterface> {
    const newMatche = await this.model.create({ ...reqBody, inProgress: true });
    return newMatche;
  }
}
