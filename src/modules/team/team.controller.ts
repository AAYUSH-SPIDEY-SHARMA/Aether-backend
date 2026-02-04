// Team Controller

import { Request, Response, NextFunction } from 'express';
import * as teamService from './team.service.js';
import { sendSuccess } from '../../utils/response.js';

// GET /team
export async function getClubTeam(
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const team = await teamService.getClubTeam();
        sendSuccess(res, team, 'Team retrieved');
    } catch (error) {
        next(error);
    }
}

// GET /team/all
export async function getAllTeamMembers(
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const members = await teamService.getAllMembers();
        sendSuccess(res, { members }, 'Team members retrieved');
    } catch (error) {
        next(error);
    }
}

// GET /team/symposium/:symposiumId
export async function getSymposiumTeam(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const members = await teamService.getSymposiumTeam(req.params.symposiumId);
        sendSuccess(res, { members }, 'Symposium team retrieved');
    } catch (error) {
        next(error);
    }
}
