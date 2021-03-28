
import { getCustomRepository } from "typeorm";
import {isAfter, addHours} from 'date-fns';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({token, password}: IRequest): Promise<void> {
    // utilizando um repo customizado
    const userRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if(!userToken) {
      throw new AppError('User Token does not exist.');
    }

    const user = await userRepository.findOne(userToken.user_id);


    if(!user) {
      throw new AppError('User  does not exist.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token Expired.');
    }

    user.password = await hash(password, 8);

  }
}

export default ResetPasswordService;