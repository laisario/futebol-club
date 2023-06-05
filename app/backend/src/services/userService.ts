import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import Users from '../database/models/users';
import { userInterface } from '../interfaces/userInterface';

export default class userService {
  constructor(private model = Users) { }

  async login(email: string, password: string): Promise<string | undefined> {
    const user = await this.model.findOne({ where: { email } });
    const haveUser = !!(user?.password && user.email);
    const compare = haveUser && bcrypt.compareSync(password, user.password);
    if (!compare || !haveUser) throw new Error('Invalid email or password');
    const token = compare && jwt.sign({ email: user.email }, 'jwt_secret');
    if (token) return token;
  }

  async getUser(email: string): Promise<userInterface | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }
}
