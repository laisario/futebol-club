import { Request, Response } from 'express';
import userServiceInterface from '../interfaces/userInterface';

export default class UserController {
  constructor(private userService: userServiceInterface) {
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const token = await this.userService.login(email, password);
      return res.status(200).json({ token });
    } catch (erro) {
      if (erro instanceof Error) {
        return res
          .status(401)
          .json({ message: erro.message });
      }
    }
  }

  public async getRole(req: Request, res: Response) {
    const { userEmail } = req.body;
    const user = await this.userService.getUser(userEmail);
    return res.status(200).json({ role: user?.role });
  }
}
