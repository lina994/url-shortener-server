import bcrypt  from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models.js';
import ApiError from '../errors/apiError.js';

// Synchronous sign
// Returns the JsonWebToken as string
function generateJwt(id, username) {
  return jwt.sign(  
    {id, username},  // payload
    process.env.SECRET_KEY,  // secretOrPrivateKey
    {expiresIn: '24h'}  // options
  );
}

class UserController {
  async registration(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) {
      return next(ApiError.badRequest('Please enter Username and Password.'));
    }
    try {
      const candidate = await User.findOne({ 
        where: { username: username } 
      });
      if (candidate) {
        return next(ApiError.badRequest('That username is taken. Try another.'));
      }
      const hashPassword = bcrypt.hashSync(password, 5);
      const user = await User.create({
        username: username,
        password: hashPassword
      });
      const token = generateJwt(user.id, user.username);
      res.json({ token });
    } catch(e) {
      next(ApiError.internal(e.message));
    }
  }
  
  async login(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) {
      return next(ApiError.badRequest('Please enter Username and Password.'));
    }
    try {
      const user = await User.findOne({ 
        where: { username: username } 
      });
      if (!user) {
        return next(ApiError.badRequest('Incorrect Username or Password.'));
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(ApiError.badRequest('Incorrect Username or Password'));
      }
      const token = generateJwt(user.id, user.username);
      res.json({ token });
    } catch(e) {
      next(ApiError.internal(e.message));
    }
  }

  async updatePassword(req, res, next) {
    const { password, newPassword } = req.body;
    if (!password || !newPassword) {
      return next(ApiError.badRequest('Please enter current password and new password.'));
    }
    try {
      let user = await User.findByPk(req.jwt.id);
      if (!user) {
        return next(ApiError.unauthorized("Invalid token"));
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(ApiError.badRequest('Incorrect Username or Password'));
      }
      const hashPassword = bcrypt.hashSync(password, 5);
      user.password = hashPassword;
      await user.save();
      const token = generateJwt(user.id, user.username);
      res.json({ token });
    } catch(e) {
      next(ApiError.internal(e.message));
    }
  }


  // TODO:
  // Delete user
  // Change password

}


export default new UserController();

