import { JwtPayload, verify } from 'jsonwebtoken';

function verifyToken(token: string): JwtPayload {
  const decoded = token && verify(token, 'jwt_secret') as JwtPayload;
  return decoded as JwtPayload;
}

export default verifyToken;
