import { paginateRawCustom, RequestPagination, IPagination } from '@shared/typeorm/CustomPaginationMeta';
import { injectable, inject } from 'tsyringe';
import { ITransactionGrouped } from '../models/transaction-grouped';
import TransactionsRepository from '../typeorm/repositories/TransactionsRepository';


@injectable()
class ListTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: TransactionsRepository
    ) {};

  public async execute(filter: {}, paginate?: RequestPagination): Promise<IPagination<ITransactionGrouped>> {

    const transaction = await paginateRawCustom(this.transactionsRepository.getJoin(filter), paginate);
    return transaction
  }
}

export default ListTransactionService;
