interface TeamServiceInterface {
  getAll: () => Promise<Team[]>;
}

interface Team {
  id: number;
  name: string;
}

export default TeamServiceInterface;
