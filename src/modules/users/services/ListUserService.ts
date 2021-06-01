
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import { paginateRepository, RequestPagination } from '@shared/typeorm/CustomPaginationMeta';
interface IPagination {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: User[];
}
@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: UsersRepository
    ) {};

  public async execute(paginate?: RequestPagination): Promise<any> {

    const user =  await this.userRepository.findAll(paginate);

    return user;
  }
}

export default ListUserService;
