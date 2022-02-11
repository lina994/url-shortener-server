import { idToShortLink, shortLinkToId } from '../utils/convert.js'
import { isValidShortLink } from '../utils/validation.js'
import { ShortLink } from '../models.js';
import ApiError from '../errors/apiError.js';

class RedirectController {
  async redirect(req, res, next) {
    if (!req.params.shortLink) {
      return next(ApiError.notFound('shortLink required'));
    }
    if (!isValidShortLink(req.params.shortLink)) {
      return next(ApiError.notFound('Illegal character in shortLink or wrong shortLink length'));
    }
    try {
      let id = shortLinkToId(req.params.shortLink);
      const record = await ShortLink.findByPk(id);
      if (!record) {
        return next(ApiError.notFound("This is a 404 error, which means you've clicked on a bad link or entered an invalid URL."));
      }
      const longUrl = record.url.startsWith('https://') ? record.url : 'https://' + record.url
      res.redirect(302, longUrl); // 301 is used for permanent redirecting
    } catch(e) {
      next(ApiError.internal(e.message));
    }
  }
}


export default new RedirectController();

