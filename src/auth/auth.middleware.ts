import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer ')
    ) {
      res.status(403).send({ error: 'not authorized' });
      return;
    }

    let idToken;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
      res.status(403).send({ error: 'not authorized' });
      return;
    }

    if (idToken === 'supersicher') {
      next();
      return;
    } else {
      res.status(403).send({ error: 'not authorized' });
      return;
    }
  }
}
