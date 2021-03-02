import { request, response, Router } from "express";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import multer from 'multer';
import uploadConfig from '../../../../../shared/config/upload';
import UpdateUserAvatarService from "@modules/users/services/UpadateUserAvatarService";
import CreateUserService from "@modules/users/services/CreateUserService";


const usersRouter = Router();
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {

  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password
  });

  return response.json(user);

})

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {

    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    })

      return response.json(user);


})

export default usersRouter;
