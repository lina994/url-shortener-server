import { idToShortLink, slugToId } from '../utils/convert.js';
import { isValidShortLink } from '../utils/validation.js';
import { ShortLink } from '../models.js';
import ApiError from '../errors/apiError.js';

class ShortLinkController {
  async getLongUrl(req, res, next) {
    const slug = req.query.slug;
    if (!slug) {
      return next(ApiError.badRequest('slug required'));
    }
    if (!isValidShortLink(slug)) {
      return next(ApiError.badRequest('Illegal character in slug or wrong slug length'));
    }
    try {
      let id = slugToId(slug);
      const record = await ShortLink.findByPk(id);
      if (!record) {
        return next(ApiError.badRequest("shortLink doesn't exist"));
      }
      res.json(record);
    } catch(e) {
      next(ApiError.internal(e.message));
    }
  }
  
  
  async shortenLink(req, res, next) {
    if (!req.body.longUrl) {
      return next(ApiError.badRequest('longUrl required'));
    }
    try {
      const record = await ShortLink.create({
        url: req.body.longUrl
      });
      let shortLink = idToShortLink(record.id);
      shortLink = `${req.get('host')}/r/${shortLink}`;
      record.dataValues.shortLink = shortLink;
      res.json(record);
    } catch(e) {
      next(ApiError.internal(e.message));
    }
  }

}


export default new ShortLinkController();

