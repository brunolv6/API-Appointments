import { request, response, Router } from "express";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import multer from 'multer';
import uploadConfig from '../../../../../shared/config/upload';
import UpdateUserAvatarService from "@modules/users/services/UpadateUserAvatarService";

import { container } from "tsyringe";
import UsersController from "../controllers/UsersController";
import UserAvatarController from "../controllers/UserAvatarController";


const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
)

export default usersRouter;
