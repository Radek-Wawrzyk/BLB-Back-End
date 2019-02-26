import { Router } from 'express';
import teamsController from "../controllers/teamsController";
import { catchAsync } from "../middlewares/errors";

export default () => {
  const api = Router();

  //POST /api/teams
  api.post('/', catchAsync(teamsController.create));

  //GET /api/teams
  api.get('/', catchAsync(teamsController.findAll));

  return api;
}