import { injectable, inject } from 'tsyringe';
import Transaction from '../typeorm/entities/Transaction';
import TransactionsRepository from '../typeorm/repositories/TransactionsRepository';

interface IPagination {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Transaction[];
}
@injectable()
class ListTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: TransactionsRepository
    ) {};

  public async execute(): Promise<IPagination> {

    const transaction = await this.transactionsRepository.paginate();

    return transaction as IPagination;
  }
}

export default ListTransactionService;