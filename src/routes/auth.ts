import { Router } from 'express';
import { FormLoginRequest, SignupRequest } from '../models/login';
import { RefreshAccessTokenRequest, TokenInfo } from '../models/token';
import {
  generateRefreshToken,
  hashPassword,
  signJwt,
  verifyRefreshToken,
} from '../utils/auth';
import { prismaClient } from '../utils/db';
import { generateRandom } from '../utils/random';
import { sanitizeCustomer } from '../utils/sanitize';

const router = Router();

const oneDayMs = 86400000000;
const ninetyDayMs = 7776000000;

router.post('/refresh', async (req, res) => {
  const payload = RefreshAccessTokenRequest.fromJSON(req.body);

  if (!verifyRefreshToken(payload.refreshToken)) {
    return res.status(403).send('unauthorised');
  }

  const tokenInfo = await prismaClient.tokenInfo.findUnique({
    where: {
      refreshToken: payload.refreshToken,
    },
  });

  if (!tokenInfo) {
    return res.status(403).send('unauthorised');
  }

  res
    .status(200)
    .json(
      TokenInfo.builder()
        .accessToken(signJwt(tokenInfo.customerId))
        .refreshToken(payload.refreshToken)
        .build(),
    );
});

router.post('/sign-in', async (req, res) => {
  const { body } = req;
  const loginRequest = FormLoginRequest.fromJSON(body);
  const customerRecord = await prismaClient.customer.findUnique({
    where: {
      email: loginRequest.email,
    },
  });

  if (customerRecord === null) {
    return res.status(404).send('The account does not exist.');
  }

  const hashedInputPassword = await hashPassword(
    loginRequest.password,
    customerRecord.passwordSalt,
  );

  if (hashedInputPassword !== customerRecord.password) {
    return res.status(401).send('Email and password does not match');
  }

  const refreshToken = await generateRefreshToken();

  await prismaClient.tokenInfo.create({
    data: {
      customerId: customerRecord.id,
      refreshToken,
      exipry: new Date(Date.now() + ninetyDayMs),
    },
  });

  res
    .status(200)
    .json(
      TokenInfo.builder()
        .accessToken(signJwt(customerRecord.id))
        .refreshToken(refreshToken)
        .build(),
    );
});

router.post('/sign-up', async (req, res) => {
  const { body } = req;
  const signupRequest = SignupRequest.fromJSON(body);

  const passwordSalt = (await generateRandom(64)).toString('hex');
  const hashedPassword = await hashPassword(
    signupRequest.password,
    passwordSalt,
  );

  const createdCustomer = await prismaClient.customer.create({
    data: {
      email: signupRequest.email,
      password: hashedPassword,
      passwordSalt,

      signupOtp: {
        create: {
          expiry: new Date(Date.now() + oneDayMs),
          verificationCode: (
            await generateRandom()
          )
            .toString('base64')
            .replace(/[^0-0a-zA-Z]/g, '')
            .substring(0, 6),
        },
      },
    },
  });

  res.status(200).json(sanitizeCustomer(createdCustomer));
});

export { router as authRouter };
