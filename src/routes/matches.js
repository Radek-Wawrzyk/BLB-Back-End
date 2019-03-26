import { Router } from 'express';
import matchesController from "../controllers/matchesController";
import usersController from "../controllers/usersController";
import { catchAsync } from "../middlewares/errors";

export default () => {
  const api = Router();

  //POST /api/matches
  api.post('/', catchAsync(usersController.validate), catchAsync(matchesController.update));

  //GET /api/matches
  api.get('/', catchAsync(matchesController.findAll));

  return api;
}