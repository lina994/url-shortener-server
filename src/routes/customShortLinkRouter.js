import Router from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import customShortLinkController from '../controllers/customShortLinkController.js';
import ApiError from '../errors/apiError.js';

const router = new Router();

router.get('/', customShortLinkController.getLongUrl);
router.post('/', authMiddleware, customShortLinkController.shortenLink);

router.put('/', function (req, res, next) {
  next(ApiError.notImplemented("not implemented"));
});
router.delete('/', function (req, res, next) {
  next(ApiError.notImplemented("not implemented"));
});


export default router;

