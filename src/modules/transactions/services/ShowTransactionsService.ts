

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import TransactionsRepository from '../typeorm/repositories/TransactionsRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: TransactionsRepository
    ) {};

  public async execute({ id }: IRequest): Promise<any> {

    const transactions = await this.transactionsRepository.findById(id);

    if(!transactions) {
      throw new AppError('Transações não encontrada.');
    }
    return transactions;
  }
}

export default ShowTransactionsService;
