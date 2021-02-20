import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";
import User from "../models/User";
import authCOnfig from '../config/auth'

interface Request{
    email: string;
    password: string;
}

interface Response{
  user: User;
  token: string;
}

class AuthenticateUserService{
  public async execute({ email, password}: Request): Promise<Response> {

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: {email} });

    if(!user){
      throw new Error('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched){
      throw new Error('Incorrect email/password combination.');
    }

    const { secret, expiresIn } = authCOnfig.jwt;

    // http://www.md5.cz/ to get a hash
    const token = sign({}, secret, {
      subject: user.id, // id do usuario que usa este token
      expiresIn // este token valerá por um dia
    })

    return {
      user,
      token,
    }
  }
}

export default AuthenticateUserService;
