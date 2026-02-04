// Symposium Routes

import { Router } from 'express';
import * as symposiumController from './symposium.controller.js';

const router = Router();

router.get('/', symposiumController.getAllSymposiums);
router.get('/active', symposiumController.getActiveSymposium);
router.get('/year/:year', symposiumController.getSymposiumByYear);

export default router;
