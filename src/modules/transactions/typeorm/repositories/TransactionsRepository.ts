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

    let transactions = this.repo
      .createQueryBuilder('transaction')
      .innerJoin('rev_exp', 'revexp', 'revexp.id = transaction.rev_exp_id')
      .addSelect(['revexp.name', 'revexp.rev_exp_id'])
      .getRawMany();

    const result = (await transactions).map((tr, i, array) => {

      let filtered = {
        nome: tr.revexp_name,
        valor: tr.transaction_valor,
        id: tr.transaction_rev_exp_id
      }
      return filtered
    })


    var o: any = {};

    result.forEach((i) => {
      var obj = i.id;
      i.valor = parseInt(i.valor)

      if (!o[obj]) {
        return o[obj] = i
      }
        return o[obj].valor = o[obj].valor + i.valor
    })


    var filteredTransactions: any = []
    Object.keys(o).forEach((key) => {
      filteredTransactions.push(o[key])
    })

    return filteredTransactions;
  }

  public async paginate() {
    return await this.repo.createQueryBuilder().paginate();
  }
}

export default TransactionsRepository;
