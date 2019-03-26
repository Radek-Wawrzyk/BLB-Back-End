import { Router } from 'express';
import newsController from "../controllers/newsController";
import usersController from "../controllers/usersController";
import { catchAsync } from "../middlewares/errors";

export default () => {
  const api = Router();

  //POST /api/news
  api.post('/', catchAsync(usersController.validate), catchAsync(newsController.update));

  //GET /api/news
  api.get('/', catchAsync(newsController.findAll));

  return api;
}