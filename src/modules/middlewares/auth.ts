import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if (!authToken) throw new Error();

    req.headers['id-user'] = authToken;

    next();
  }
}
