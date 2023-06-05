interface userInterface {
  id?: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export default interface UserServiceInterface {
  login: (email: string, password: string) => Promise<string | undefined>;
  getUser: (email: string) => Promise<userInterface | null>;
}
export { userInterface };
