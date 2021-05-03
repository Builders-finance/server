import { EntityRepository, Repository, getConnection} from 'typeorm';
import Transaction from '../entities/Transaction';

@EntityRepository(Transaction)
export class TransactionsRepository{
  private repo: Repository<Transaction>;
  constructor() {
    this.repo = getConnection().getRepository(Transaction);
  }

  public async create(transaction: Transaction): Promise<Transaction> {
    let transactionProxy = this.repo.create(transaction);
    return await this.repo.save(transactionProxy);
  }

  public async remove(transaction: Transaction): Promise<void> {
    await this.repo.remove(transaction);
    return
  }

  public async save(transaction: Transaction): Promise<Transaction> {
    return await this.repo.save(transaction);
  }

  public async getJoin() {
    //inner join and paginate
    let transactions = await this.repo.createQueryBuilder('transaction')
      .innerJoin('rev_exp', 'revexp', 'revexp.id = transaction.rev_exp_id')
      .addSelect('revexp.name')
      .getRawMany()
    return transactions;
  }

  public async paginate() {
    return await this.repo.createQueryBuilder().paginate();
  }
}

export default TransactionsRepository;
