import * as express from 'express';
import teamService from '../services/teamService';
import TeamController from '../controllers/teamController';

const router = express.Router();

const teamController = new TeamController(teamService);

router.get('/', teamController);

export default router;
