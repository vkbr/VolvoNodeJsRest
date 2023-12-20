import { Router } from 'express';
import { authRouter } from './auth';
import { customerRouter } from './customer';

const router = Router();

router.use('/auth', authRouter);
router.use('/customer', customerRouter);

router.all('*', (req, res) => res.status(404).send('Route not found.'));

export { router as appRouter };
