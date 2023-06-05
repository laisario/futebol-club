import { Request, Response, NextFunction } from 'express';
import verifyToken from '../utils/auth';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = !!token?.length && verifyToken(token);
    if (decoded) {
      req.body.userEmail = decoded?.email;
      return next();
    }
    return res.status(401).json({ message: 'Token must be a valid token' });
  } catch (e) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateToken;
