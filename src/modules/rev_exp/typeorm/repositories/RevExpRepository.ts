import { EntityRepository, Repository, getConnection, IsNull, Brackets, QueryBuilder, SelectQueryBuilder} from 'typeorm';
import RevExp from '../entities/RevExp';

@EntityRepository(RevExp)
export class RevExpRepository{
  private repo: Repository<RevExp>;
  constructor() {
    this.repo = getConnection().getRepository(RevExp);
  }

  public list(params?: any): SelectQueryBuilder<RevExp> {
    return this.repo.createQueryBuilder('revexp');
  }

  public async create(revExp: RevExp): Promise<RevExp> {
    let revExpProxy = this.repo.create(revExp);
    return await this.repo.save(revExpProxy);
  }

  public async remove(revExp: RevExp): Promise<void> {
    await this.repo.remove(revExp);
    return
  }

  public async save(revExp: RevExp): Promise<RevExp> {
    return await this.repo.save(revExp);
  }

  // async pagination(options: IPaginationOptions): Promise<Pagination<RevExp>> {
  //   return paginate<RevExp>(this.repo, options);
  // }

  public findCategories(userId: string): SelectQueryBuilder<RevExp> {
    const queryBuilder = this.repo
    .createQueryBuilder("rev_exp")
    .select(['id', 'name', 'description', 'icon', 'rev_exp_id', 'status', 'rec_des'])
    .where("rev_exp.rev_exp_id is null")
    .andWhere( new Brackets (sub => {
      sub.where("rev_exp.user_id = :id", {id: userId});
      sub.orWhere("rev_exp.user_id is null")
    }))
    .orderBy('name', 'ASC');

    return queryBuilder;
  }

}


export default RevExpRepository;
