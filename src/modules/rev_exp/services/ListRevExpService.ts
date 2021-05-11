
import { injectable, inject } from 'tsyringe';
import RevExp from '../typeorm/entities/RevExp';
import RevExpRepository from '../typeorm/repositories/RevExpRepository';

interface IPagination {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: RevExp[];
}
@injectable()
class ListRevExpService {
  constructor(
    @inject('RevExpRepository')
    private revExpRepository: RevExpRepository
    ) {};

  public async execute(): Promise<any> {

    const revExp = await this.revExpRepository.paginate();

    return revExp;
  }
}

export default ListRevExpService;
