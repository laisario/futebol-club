import * as express from 'express';
import TeamService from '../services/teamService';
import TeamController from '../controllers/teamController';

const router = express.Router();

const teamService = new TeamService();

const teamController = new TeamController(teamService);

router.get('/', (req, res) => teamController.getAll(req, res));
router.get('/:id', (req, res) => teamController.getById(req, res));

export default router;
