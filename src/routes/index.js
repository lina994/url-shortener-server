import Router from 'express';
import shortenRouter from './shortenRouter.js';
import RedirectController from '../controllers/redirectController.js'

const router = new Router();
router.use('/api/shorten', shortenRouter);

router.get('/:shortLink', RedirectController.redirect);

export default router;

