
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
    private revExpRepository: RevExpRepository
    ) {};

  public async execute(revExp: IRequest, userId: string): Promise<RevExp> {
    revExp.user_id = userId;
    return await this.revExpRepository.create(revExp as RevExp);

  }
}

export default CreateRevExpService;
