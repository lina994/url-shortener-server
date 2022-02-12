import { isValidChars } from '../utils/validation.js';
import { User, CustomShortLink } from '../models.js';
import ApiError from '../errors/apiError.js';

class CustomShortLinkController {
  async getLongUrl(req, res, next) {
    const slug = req.query.slug;
    if (!slug) {
      return next(ApiError.badRequest('slug required'));
    }
    if (!isValidChars(slug)) {
      return next(ApiError.badRequest('Illegal character in slug'));
    }
    try {
      const record = await CustomShortLink.findOne({ 
        where: { slug: slug } 
      });
      if (!record) {
        return next(ApiError.badRequest("shortLink doesn't exist"));
      }
      res.json(record);
    } catch(e) {
      next(ApiError.internal(e.message));
    }
  }
  
  
  async shortenLink(req, res, next) {
    const slug = req.body.slug;
    if (!req.body.longUrl || !slug) {
      return next(ApiError.badRequest('longUrl and slug required'));
    }
    try {
      let record = await CustomShortLink.findOne({ 
        where: { slug: slug } 
      });
      
      if (record) {
        return next(ApiError.badRequest("shortLink exist"));
      }
      let user = await User.findByPk(req.jwt.id);
      if (!user) {
        return next(ApiError.badRequest("user not exist"));
      }
      record = await CustomShortLink.create({
        url: req.body.longUrl,
        slug: slug
      });
      await record.setUser(user);
      let shortLink = `${req.get('host')}/${slug}`;
      record.dataValues.shortLink = shortLink;
      res.json(record);
    } catch(e) {
      next(ApiError.internal(e.message));
    }
  }

}


export default new CustomShortLinkController();

