import { Router } from 'express';
import newsController from "../controllers/newsController";
import { catchAsync } from "../middlewares/errors";

export default () => {
  const api = Router();

  //POST /api/news
  api.post('/', catchAsync(newsController.update));

  //GET /api/news
  api.get('/', catchAsync(newsController.findAll));

  return api;
}