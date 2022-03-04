import { User, CustomShortLink } from '../models.js';
import ApiError from '../errors/apiError.js';

class DashboardController {

  async getAllUserLinks(req, res, next) {
    try {
      let user = await User.findByPk(req.jwt.id);
      if (!user) {
        return next(ApiError.unauthorized("Invalid token"));
      }
      let links = await user.getCustom_short_links();
      res.json(links);
    } catch(e) {
      next(ApiError.internal(e.message));
    }
  }

}


export default new DashboardController();

