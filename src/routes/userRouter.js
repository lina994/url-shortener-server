import Router from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import userController from '../controllers/userController.js';

const router = new Router();


router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.put('/password', authMiddleware, userController.updatePassword);

export default router;

