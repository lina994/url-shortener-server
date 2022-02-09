import Router from 'express';
import shortenRouter from './shortenRouter.js';

const router = new Router();
router.use('/shorten', shortenRouter);


export default router;

