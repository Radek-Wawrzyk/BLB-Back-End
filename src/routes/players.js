import { Router } from 'express';
import playersController from "../controllers/playersController";
import { catchAsync } from "../middlewares/errors";

export default () => {
  const api = Router();

  //POST /api/players
  api.post('/', catchAsync(playersController.update));

  //GET /api/players
  api.get('/', catchAsync(playersController.find));
  
  //GET /api/players/photo
  api.get('/photo', catchAsync(playersController.getPhoto));

  return api;
}