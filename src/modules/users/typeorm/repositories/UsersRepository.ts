import { paginateRepository, RequestPagination } from '@shared/typeorm/CustomPaginationMeta';
import { EntityRepository, Repository, getCustomRepository, getConnection} from 'typeorm';
import User from '../entities/User';
@EntityRepository(User)
export class UsersRepository{
  private repo: Repository<User>;
  constructor() {
    this.repo = getConnection().getRepository(User);
  }

  public async findbyEmail(email: string): Promise<User | undefined> {
    const user = this.repo.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async findAll(paginate?: RequestPagination) {
    return await paginateRepository(this.repo, paginate);
  }

  public async findbyName(name: string): Promise<User | undefined> {
    const user = this.repo.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  public async create(user: User): Promise<User> {
    let userProxy = this.repo.create(user);
    return await this.repo.save(userProxy);
  }

  public async findOne(id: string): Promise<User | undefined> {
    return await this.repo.findOne(id);
  }

  public async remove(user: User): Promise<void> {
    await this.repo.remove(user);
    return
  }

  public async save(user: User): Promise<User> {
    return await this.repo.save(user);
  }

  // public async paginate() {
  //   return await paginate(this.repo.createQueryBuilder().paginate();
  // }
}

export default UsersRepository;
