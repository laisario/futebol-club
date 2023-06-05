import { Request, Response, NextFunction } from 'express';

const validateCredentials = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  const isEmailOk = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm.test(email);
  const isPasswordOK = password.length >= 6;
  if (!isEmailOk || !isPasswordOK) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
};

export default validateCredentials;
