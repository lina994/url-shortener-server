import Router from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import dashboardController from '../controllers/dashboardController.js';
import ApiError from '../errors/apiError.js';

const router = new Router();

router.get('/', authMiddleware, dashboardController.getAllUserLinks);

export default router;

