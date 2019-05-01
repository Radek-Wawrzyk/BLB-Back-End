import { Router } from 'express';
import usersController from "../controllers/usersController";
import { catchAsync } from "../middlewares/errors";

export default () => {
  const api = Router();

  //POST /api/users/authenticate
  api.post('/authenticate/', catchAsync(usersController.authenticate));
  
  //POST /api/users
  api.post('/', catchAsync(usersController.validate), catchAsync(usersController.update));

  //GET /api/users
  api.get('/', catchAsync(usersController.validate), catchAsync(usersController.findAll));
  

  return api;
}