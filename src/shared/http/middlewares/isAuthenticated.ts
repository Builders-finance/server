import  authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
      throw new AppError('JWT token is missing.');
    }
    // Bearer ashuhudyuh377sjhd73hjahau
    const [, token] = authHeader.split(' ');

    try {
      const decodedToken = verify(token, authConfig.jwt.secret);

      const { sub } = decodedToken as TokenPayload;

      request.user = {
        id: sub,
      }

      return next();
    } catch {
      throw new AppError('Invalid JWT Token.');
    }
}