import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if (!authToken) throw new Error('Token is invalid');

    req.headers['id-user'] = authToken.toString();

    next();
  }
}
