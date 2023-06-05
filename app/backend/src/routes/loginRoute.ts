import * as express from 'express';
import validateToken from '../middlewares/auth';
import validateCredentials from '../middlewares/user';
import UserService from '../services/userService';
import UserController from '../controllers/userController';

const router = express.Router();

const userService = new UserService();
const userController = new UserController(userService);

router.post('/', validateCredentials, (req, res) => userController.login(req, res));
router.get('/role', validateToken, (req, res) => userController.getRole(req, res));

export default router;
