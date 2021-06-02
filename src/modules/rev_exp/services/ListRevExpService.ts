
import { paginateRawCustom, RequestPagination } from '@shared/typeorm/CustomPaginationMeta';
import { injectable, inject } from 'tsyringe';
import RevExpRepository from '../typeorm/repositories/RevExpRepository';

@injectable()
class ListRevExpService {
  constructor(
    @inject('RevExpRepository')
    private revExpRepository: RevExpRepository
    ) {};

  public async execute(userId: string, paginate?: RequestPagination): Promise<any> {
    const revExp = await paginateRawCustom(this.revExpRepository.findCategories(userId), paginate);

    return revExp;
  }
}

export default ListRevExpService;
