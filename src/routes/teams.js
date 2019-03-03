import { Router } from 'express';
import teamsController from "../controllers/teamsController";
import { catchAsync } from "../middlewares/errors";

export default () => {
  const api = Router();

  //POST /api/teams
  api.post('/', catchAsync(teamsController.update));

  //GET /api/teams
  api.get('/', catchAsync(teamsController.find));
  
  //GET /api/teams/photo
  api.get('/photo', catchAsync(teamsController.getPhoto));

  return api;
}