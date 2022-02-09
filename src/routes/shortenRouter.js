import Router from 'express';
import ShortenController from '../controllers/shortenController.js';

const router = new Router();

router.get('/', ShortenController.getLongUrl);
router.post('/', ShortenController.shortenLink);

export default router;

