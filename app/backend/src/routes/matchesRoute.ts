import * as express from 'express';
import MatchesController from '../controllers/matchesController';
import MatchesService from '../services/matchesService';
import validateToken from '../middlewares/auth';
import validateTeamExists from '../middlewares/matches';

const router = express.Router();

const matchesService = new MatchesService();

const matchesController = new MatchesController(matchesService);

router.get('/', (req, res) => matchesController.getAll(req, res));
router.patch('/:id/finish', validateToken, (req, res) => matchesController.endMatche(req, res));
router.patch('/:id', validateToken, (req, res) => matchesController.updateMatche(req, res));
router.post(
  '/',
  validateToken,
  validateTeamExists,
  (req, res) => matchesController.createNewMatche(req, res),
);

export default router;
