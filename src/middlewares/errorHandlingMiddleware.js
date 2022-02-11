import ApiError from '../errors/apiError.js';

function errorHandlingMiddleware(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({message: err.message});
  }
  return res.status(500).json({message: "unexpected error! Error message: " + err.message});
}

export default errorHandlingMiddleware;

