import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import RevExp from '../typeorm/entities/RevExp';
import RevExpRepository from '../typeorm/repositories/RevExpRepository';

interface IRequest {
  name: string;
  description: string;
  rev_exp_id: string;
  user_id: string;
}

@injectable()
class CreateRevExpService {
  constructor(
    @inject('RevExpRepository')
    private revExpRepository: RevExpRepository,
  ) {}

  public async execute(revExp: IRequest, userId: string): Promise<RevExp> {
    const redisCache = new RedisCache();
    await redisCache.invalidate('revexp');

    revExp.user_id = userId;
    const rexp = await this.revExpRepository.create(revExp as RevExp);

    return rexp;
  }
}

export default CreateRevExpService;
