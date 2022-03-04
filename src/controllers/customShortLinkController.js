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
      record.clicks = record.clicks + 1;
      await record.save();
      res.json({ url: record.url });
    } catch(e) {
      next(ApiError.internal(e.message));
    }
  }
  
  
  async shortenLink(req, res, next) {
    const slug = req.body.slug;
    const title = req.body.title || '';
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
        return next(ApiError.unauthorized("Invalid token"));
      }
      record = await CustomShortLink.create({
        url: req.body.longUrl,
        slug: slug,
        title: title
      });
      await record.setUser(user);
      let shortLink = `${req.get('host')}/${slug}`;
      record.dataValues.shortLink = shortLink;
      res.json(record);
    } catch(e) {
      next(ApiError.internal(e.message));
    }
  }

  async updateRecord(req, res, next) {
    const id = req.body.id;
    const url = req.body.url;
    const slug = req.body.slug;
    const title = req.body.title;

    try {
      let user = await User.findByPk(req.jwt.id);
      if (!user) {
        return next(ApiError.unauthorized("Invalid token"));
      }
      let record = await user.getCustom_short_links({
        where: {
          id: id
        }
      });
      if (!record || record.length !== 1) {
        return next(ApiError.badRequest("Record not found"));
      }
      record = record[0];
      if (url) {
        record.url = url;
      }
      if (slug) {
        record.slug = slug;
      }
      if (title) {
        record.title = title;
      }
      await record.save();
      let shortLink = `${req.get('host')}/${record.slug}`;
      record.dataValues.shortLink = shortLink;
      res.json(record);
    } catch(e) {
      next(ApiError.internal(e.message));
    }
  }

  async deleteRecord(req, res, next) {
    try {
      let user = await User.findByPk(req.jwt.id);
      if (!user) {
        return next(ApiError.unauthorized("Invalid token"));
      }
      let record = await user.getCustom_short_links({
        where: {
          id: req.params.id
        }
      });
      if (!record || record.length !== 1) {
        return next(ApiError.badRequest("Record not found"));
      }
      record = record[0];
      await record.destroy();
      res.send();
    } catch(e) {
      next(ApiError.internal(e.message));
    }
  }

}


export default new CustomShortLinkController();

