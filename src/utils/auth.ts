import jwt from 'jsonwebtoken';
import { scrypt } from 'node:crypto';
import { generateRandom } from './random';
import { sign, verifySig } from './secret';

const { REFRESH_SECRET, JWT_SECRET } = process.env;

if (typeof REFRESH_SECRET !== 'string' || !REFRESH_SECRET.length) {
  throw new Error('Missing REFRESH_SECRET env');
}
if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET env');
}

const refreshSecretBuff = Buffer.from(REFRESH_SECRET, 'utf8');

export const hashPassword = (password: string, salt: string) => {
  return new Promise<string>((res, rej) => {
    scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) rej(err);
      else res(derivedKey.toString('hex'));
    });
  });
};

export const signJwt = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

export const unpackJwt = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {}
};

export const unpackJwtHeader = (header: string) => {};

export const generateRefreshToken = async () => {
  const random = (await generateRandom(600))
    .toString('base64')
    .replace(/[^0-9a-z]/gi, '');

  return sign(random, refreshSecretBuff);
};

export const verifyRefreshToken = (token: string) => {
  return verifySig(token, refreshSecretBuff);
};
