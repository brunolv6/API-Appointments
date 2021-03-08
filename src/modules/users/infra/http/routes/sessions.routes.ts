import { Router } from "express";
import AuthenticateUserService from '../../../services/AuthenticateUserService';
import UsersRepository from "../../typeorm/repositories/UsersRepository";

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (request, response) => {

  const { email, password } = request.body;

  const usersRepository = new UsersRepository();
  const authenticateUser = new AuthenticateUserService(usersRepository);

  const { user, token } = await authenticateUser.execute({
    email,
    password
  });

  // jwt.io verificar coisas do token gerado
  return response.json({ user, token });
});

export default sessionsRoutes;
