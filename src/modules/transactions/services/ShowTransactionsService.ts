

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Transaction from '../typeorm/entities/Transaction';
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

  public async execute({ id }: IRequest, relations: []): Promise<Transaction> {

    const transactions = await this.transactionsRepository.findById(id, relations);

    if(!transactions) {
      throw new AppError('Transações não encontrada.');
    }
    return transactions;
  }
}

export default ShowTransactionsService;
