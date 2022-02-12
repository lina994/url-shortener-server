import Router from 'express';
import shortLinkController from '../controllers/shortLinkController.js';
import ApiError from '../errors/apiError.js';

const router = new Router();

router.get('/', shortLinkController.getLongUrl);
router.post('/', shortLinkController.shortenLink);

router.put('/', function (req, res, next) {
  next(ApiError.notImplemented("not implemented"));
});
router.delete('/', function (req, res, next) {
  next(ApiError.notImplemented("not implemented"));
});


export default router;

