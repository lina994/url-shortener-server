import Router from 'express';
import userRouter from './userRouter.js';
import shortLinkRouter from './shortLinkRouter.js';
import customShortLinkRouter from './customShortLinkRouter.js';
import redirectController from '../controllers/redirectController.js'

const router = new Router();
router.use('/api/user', userRouter);
router.use('/api/shorten', shortLinkRouter);

router.use('/api/custom/shorten', customShortLinkRouter);

router.get('/r/:slug', redirectController.redirect);
router.get('/:slug', redirectController.redirectCustomLink);

export default router;

