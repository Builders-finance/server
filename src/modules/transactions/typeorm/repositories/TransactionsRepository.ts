import RevExp from '@modules/rev_exp/typeorm/entities/RevExp';
import { ITransactionGrouped } from '@modules/transactions/models/transaction-grouped';
import { EntityRepository, Repository, getConnection, createQueryBuilder, SelectQueryBuilder} from 'typeorm';
import Transaction from '../entities/Transaction';
import moment from 'moment';

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

  public getJoin(filter: any): SelectQueryBuilder<any>  {
    const queryBuilder = this.repo.createQueryBuilder("trans")
    .innerJoin("trans.revExp", "revexp")
    .select(['revexp.name as nome', 'revexp.rec_des as rec_des', 'revexp.icon as icon', 'revexp.id as id'])
    .addSelect('CAST(SUM(trans.valor) as FLOAT)', 'valor')
    .where("trans.user_id = :id", { id: filter.userId })
    .groupBy('revexp.name')
    .addGroupBy('revexp.rec_des')
    .addGroupBy('revexp.icon')
    .addGroupBy('revexp.id');

    if(filter.day) {
      queryBuilder.andWhere('trans.data::date = :dateFilter::date', { dateFilter: moment().day(filter.day).format('YYYY-MM-DD')})
    }
    if(filter.month) {
      //to_char(t.data, 'MM-YYYY') = '05-2021'
      queryBuilder.andWhere("to_char(trans.data, 'YYYY-MM') = :dateFilter", { dateFilter: moment().month(parseInt(filter.month) - 1).format('YYYY-MM')})
    }
    if(filter.year) {
      queryBuilder.andWhere("to_char(trans.data, 'YYYY') = :dateFilter", { dateFilter: moment().year(filter.year).format('YYYY')})
    }

    return queryBuilder;
  }

  // public async paginate() {
  //   return await this.repo.createQueryBuilder().paginate();
  // }

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
