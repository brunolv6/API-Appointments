import { getRepository } from "typeorm";
import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';
import path from 'path';
import uploadConfig from '../../../shared/config/upload';
import fs from "fs";

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename}: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if(!user) {
      throw new AppError('Only authenticated users can change avatar.', 401)
    }

    if(user.avatar) {
      // delete avatar anterior
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if(userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: '*****',
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return userWithoutPassword;
  }
}

export default UpdateUserAvatarService;
