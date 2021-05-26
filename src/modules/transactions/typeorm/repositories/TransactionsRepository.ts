import RevExp from '@modules/rev_exp/typeorm/entities/RevExp';
import { EntityRepository, Repository, getConnection, createQueryBuilder} from 'typeorm';
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

  public async getJoin(userId: string) {
    const transactions = await this.repo.createQueryBuilder("trans")
    .innerJoin("trans.revExp", "revexp")
    .select(['revexp.name as nome', 'revexp.rec_des as rec_des', 'revexp.icon as icon', 'revexp.id as id'])
    .addSelect('SUM(trans.valor)', 'valor')
    .where("trans.user_id = :id", { id: userId })
    .groupBy('revexp.name')
    .addGroupBy('revexp.rec_des')
    .addGroupBy('revexp.icon')
    .addGroupBy('revexp.id')

    // console.log(transactions.getSql())
    const result = transactions.getRawMany();
    // console.log(result)

    return result;
  }

  public async paginate() {
    return await this.repo.createQueryBuilder().paginate();
  }

  public async findById(id: string): Promise<Transaction | undefined> {
    let trans = this.repo.createQueryBuilder('transaction').where("transaction.id = :id", { id: id }).getOne();
    return await trans
  }

  public async findByRevExpId(revExpId: string, userId: string): Promise<Transaction[] | undefined> {
    let trans = this.repo.createQueryBuilder('transaction')
      .where("transaction.rev_exp_id = :id", { id: revExpId })
      .andWhere("transaction.user_id = :userId", { userId: userId })

    return await trans.getMany();
  }
}

export default TransactionsRepository;
