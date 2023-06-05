import * as express from 'express';
import LeaderboardHomeController from '../controllers/leaderboardHomeController';
import MatchesService from '../services/matchesService';
import LeaderboardHomeService from '../services/leaderboardHomeService';
import LeaderboardAwayService from '../services/leaderboardAwayService';
import LeaderboardAwayController from '../controllers/leaderboardAwayController';

const router = express.Router();
const matcheService = new MatchesService();

const leaderboardHomeCont = new LeaderboardHomeController(matcheService, LeaderboardHomeService);
const leaderboardAwayCont = new LeaderboardAwayController(matcheService, LeaderboardAwayService);

router.get('/home', (req, res) => leaderboardHomeCont.getHomeInfo(req, res));
router.get('/away', (req, res) => leaderboardAwayCont.getHomeInfo(req, res));

export default router;
