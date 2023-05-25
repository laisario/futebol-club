import * as express from 'express';
import TeamService from '../services/teamService';
import TeamController from '../controllers/teamController';

const router = express.Router();

const teamController = new TeamController(TeamService);

router.get('/', teamController.getAll);

export default router;
