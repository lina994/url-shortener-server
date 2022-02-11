import Router from 'express';
import ShortenController from '../controllers/shortenController.js';
import ApiError from '../errors/apiError.js';

const router = new Router();

router.get('/', ShortenController.getLongUrl);
router.post('/', ShortenController.shortenLink);

router.put('/', function (req, res, next) {
  next(ApiError.notImplemented("not implemented"));
});
router.delete('/', function (req, res, next) {
  next(ApiError.notImplemented("not implemented"));
});


export default router;

