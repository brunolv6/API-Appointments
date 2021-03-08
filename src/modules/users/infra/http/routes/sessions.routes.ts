import { Router } from "express";
import { container } from "tsyringe";
import AuthenticateUserService from '../../../services/AuthenticateUserService';
import UsersRepository from "../../typeorm/repositories/UsersRepository";

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (request, response) => {

  const { email, password } = request.body;

  const authenticateUser = container.resolve(AuthenticateUserService);

  const { user, token } = await authenticateUser.execute({
    email,
    password
  });

  // jwt.io verificar coisas do token gerado
  return response.json({ user, token });
});

export default sessionsRoutes;
