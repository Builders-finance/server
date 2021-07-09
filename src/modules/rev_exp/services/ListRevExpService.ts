import {
  paginateRawCustom,
  RequestPagination,
} from '@shared/typeorm/CustomPaginationMeta';
import { injectable, inject } from 'tsyringe';
import RevExpRepository from '../typeorm/repositories/RevExpRepository';
import RedisCache from '@shared/cache/RedisCache';

@injectable()
class ListRevExpService {
  constructor(
    @inject('RevExpRepository')
    private revExpRepository: RevExpRepository,
  ) {}

  public async execute(
    userId: string,
    paginate?: RequestPagination,
  ): Promise<any> {
    const redisCache = new RedisCache();

    let revExp = await redisCache.recover('revexp');

    if (!revExp) {
      revExp = await paginateRawCustom(
        this.revExpRepository.findCategories(userId),
        paginate,
      );

      await redisCache.save('revexp', revExp);
    }

    await redisCache.save('teste', 'teste');

    return revExp;
  }
}

export default ListRevExpService;
