import { Router } from 'express';
import teamsController from "../controllers/teamsController";
import usersController from "../controllers/usersController";
import { catchAsync } from "../middlewares/errors";

export default () => {
  const api = Router();

  //POST /api/teams
  api.post('/', catchAsync(usersController.validate), catchAsync(teamsController.update));

  //GET /api/teams
  api.get('/', catchAsync(teamsController.find));
  
  //GET /api/teams/photo
  api.get('/photo', catchAsync(teamsController.getPhoto));

  return api;
}