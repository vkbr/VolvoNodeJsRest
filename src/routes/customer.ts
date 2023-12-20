import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express';
import { Roles } from '../db';
import { getSubjectUserId } from '../middlewares/auth';
import {
  UpdateCustomerRequest,
  VerifyAccountRequest,
} from '../models/customer';
import { hashPassword } from '../utils/auth';
import { prismaClient } from '../utils/db';
import { sanitizeCustomer } from '../utils/sanitize';

const router = Router();

const protectedResource: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const subjectUserId = getSubjectUserId(req);
  const subject = subjectUserId
    ? await prismaClient.customer.findUnique({
        where: {
          id: subjectUserId,
        },
      })
    : undefined;

  const editAllowed =
    subject?.role === Roles.ADMIN || subject?.id === req.params.customerId;

  if (!editAllowed) {
    console.log({ subjectEmail: subjectUserId, subject });
    return res.status(403).send('unauthorized');
  }

  next();
};

router.get('/all', async (req, res) => {
  const subjectUserId = getSubjectUserId(req);
  console.log({ subjectUserId });

  if (!subjectUserId) {
    return res.status(401).send('unauthenticated');
  }

  const customers = await prismaClient.customer.findMany({});

  res.status(200).json(customers.map(sanitizeCustomer));
});

router.post('/verify', async (req, res) => {
  const payload = VerifyAccountRequest.fromJSON(req.body);

  const otpRecord = await prismaClient.customerSignupOtp.findFirst({
    where: {
      customerId: payload.customerId,
      verificationCode: payload.otp,
      expiry: {
        gt: new Date(),
      },
    },
  });

  if (!otpRecord) {
    return res.status(400).send('Incorrect or expired code.');
  }

  await prismaClient.customer.update({
    data: {
      isVerified: true,
    },
    where: {
      id: payload.customerId,
    },
  });

  await prismaClient.customerSignupOtp.delete({
    where: {
      id: otpRecord.id,
    },
  });

  res.status(200).send('verified');
});

router.put('/:customerId', protectedResource, async (req, res) => {
  const payload = UpdateCustomerRequest.fromJSON(req.body);

  const customer = await prismaClient.customer.findUnique({
    where: {
      id: req.params.customerId,
    },
  });

  if (!customer) {
    return res.status(404).send();
  }

  const hashedPassword = payload.password
    ? await hashPassword(payload.password, customer.passwordSalt)
    : undefined;

  const updatedCustome = await prismaClient.customer.update({
    where: {
      id: req.params.customerId,
    },
    data: {
      email: payload.email,
      password: hashedPassword,
    },
  });

  res.status(200).json(sanitizeCustomer(updatedCustome));
});

router.delete('/:customerId', protectedResource, async (req, res) => {
  await prismaClient.customer.delete({
    where: {
      id: req.params.customerId,
    },
  });

  res.status(200).send('deleted');
});

export { router as customerRouter };
