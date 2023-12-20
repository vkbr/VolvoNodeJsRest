import { randomBytes } from 'crypto';

export const generateRandom = (len: number = 32): Promise<Buffer> =>
  new Promise((res, rej) => {
    randomBytes(len, (err, buffer) => {
      if (err) rej(err);
      else res(buffer);
    });
  });
