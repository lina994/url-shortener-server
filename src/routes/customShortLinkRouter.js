import Router from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import customShortLinkController from '../controllers/customShortLinkController.js';

const router = new Router();

router.get('/', customShortLinkController.getLongUrl);
router.post('/', authMiddleware, customShortLinkController.shortenLink);
router.put('/', authMiddleware, customShortLinkController.updateRecord);
router.delete('/:id', authMiddleware, customShortLinkController.deleteRecord);


export default router;

