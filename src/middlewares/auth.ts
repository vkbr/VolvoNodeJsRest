import type { Request, RequestHandler } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { unpackJwt } from '../utils/auth';

const authMiddlewares: RequestHandler[] = [];

const reqUserId = new WeakMap<Request, string>();

const authMiddleware: RequestHandler = async (req, res, next) => {
  if (req.headers.authorization?.startsWith('Bearer')) {
    const unpacked = unpackJwt(req.headers.authorization.substring(7));
    const expiresIn = (unpacked as JwtPayload)?.exp;
    if (typeof expiresIn === 'number') {
      const expresInMs = expiresIn * 1000;
      if (Date.now() < expresInMs) {
        reqUserId.set(req, (unpacked as JwtPayload).userId);
      }
    }
  }
  next();
};

export const getSubjectUserId = (req: Request) => reqUserId.get(req);

authMiddlewares.push(authMiddleware);

export { authMiddlewares };
