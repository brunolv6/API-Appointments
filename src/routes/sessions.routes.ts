import { Router } from "express";
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (request, response) => {

  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password
  });

  // jwt.io verificar coisas do token gerado
  return response.json({ user, token });
});

export default sessionsRoutes;
