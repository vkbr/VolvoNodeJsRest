import { createHmac, timingSafeEqual } from 'node:crypto';

export const sign = (val: string, secret: Buffer): `${string}.${string}` => {
  return `${val}.${createHmac('sha256', secret)
    .update(val)
    .digest('base64')
    .replace(/\=+$/, '')}`;
};

export const verifySig = (input: string, secret: Buffer) => {
  const [message] = input.split('.');

  const expectedMessage = sign(message, secret);

  const expectedMessageBuffer = Buffer.from(expectedMessage);
  const inputBuffer = Buffer.from(input);

  return timingSafeEqual(inputBuffer, expectedMessageBuffer);
};
