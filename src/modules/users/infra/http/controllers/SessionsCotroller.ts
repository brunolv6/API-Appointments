import { Request, Response } from "express";
import { container } from "tsyringe";
import AuthenticateUserService from '../../../services/AuthenticateUserService';
import UsersRepository from "../../typeorm/repositories/UsersRepository";

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password
    });

    // jwt.io verificar coisas do token gerado
    return response.json({ user, token });
  }
}
