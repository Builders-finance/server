import { EntityRepository, Repository, getConnection, IsNull, Brackets} from 'typeorm';
import RevExp from '../entities/RevExp';

@EntityRepository(RevExp)
export class RevExpRepository{
  private repo: Repository<RevExp>;
  constructor() {
    this.repo = getConnection().getRepository(RevExp);
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

  public async paginate() {
    return await this.repo.createQueryBuilder().paginate();
  }

  public async findCategories(userId: string) {
    return await this.repo
    .createQueryBuilder("rev_exp")
    .where("rev_exp.rev_exp_id is null")
    .andWhere( new Brackets (sub => {
      sub.where("rev_exp.user_id = :id", {id: userId});
      sub.orWhere("rev_exp.user_id is null")
    }))
    .paginate();
  }

}


export default RevExpRepository;
