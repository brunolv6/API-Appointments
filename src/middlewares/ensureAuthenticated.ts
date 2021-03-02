import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {

  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new AppError('JWT token us missing', 401);
  }

  // Bearer ahuaf8yfsudaduygasd
  const [, token] = authHeader.split(' ');

  try{
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload; // force decoded to be TokenPayload

    // console.log(decoded);

    request.user = {
      id: sub,
    }

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
