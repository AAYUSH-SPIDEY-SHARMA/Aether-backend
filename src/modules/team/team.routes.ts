// Team Routes

import { Router } from 'express';
import * as teamController from './team.controller.js';

const router = Router();

router.get('/', teamController.getClubTeam);
router.get('/all', teamController.getAllTeamMembers);
router.get('/symposium/:symposiumId', teamController.getSymposiumTeam);

export default router;
