import jwt from 'jsonwebtoken';
import ApiError from '../errors/apiError.js';

function authMiddleware(req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const authorization = req.headers.authorization.split(' '); // [Bearer, tokenString]
    if(authorization[0] !== 'Bearer') {
      next(ApiError.unauthorized('Expexted: Bearer accessToken'));
    }
    const token = authorization[1];
    if(!token) {
      next(ApiError.unauthorized('unauthorized'));
    }
    // Synchronous verify
    // Returns the payload decoded if the signature is valid 
    // and optional expiration, audience, or issuer are valid. 
    // If not, it will throw the error.
    req.jwt = jwt.verify(token, process.env.SECRET_KEY); // id, username
    next();
  } catch(e) {
    next(ApiError.unauthorized('unauthorized'));
  }
}

export default authMiddleware;

