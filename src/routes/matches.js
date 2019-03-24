import { Router } from 'express';
import matchesController from "../controllers/matchesController";
import { catchAsync } from "../middlewares/errors";

export default () => {
  const api = Router();

  //POST /api/users
  api.post('/', catchAsync(matchesController.update));

  //GET /api/users
  api.get('/', catchAsync(matchesController.findAll));

  return api;
}