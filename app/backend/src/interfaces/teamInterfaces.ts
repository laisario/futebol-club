interface TeamServiceInterface {
  getAll: () => Promise<TeamInterface[]>;
  getById: (id: number) => Promise<TeamInterface | null>;
}

interface TeamInterface {
  id: number;
  teamName: string;
}

export { TeamInterface };

export default TeamServiceInterface;
