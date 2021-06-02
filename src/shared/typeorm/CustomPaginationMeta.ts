import { IPaginationMeta, paginateRaw } from "nestjs-typeorm-paginate";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Repository, SelectQueryBuilder } from "typeorm";

export class RequestPagination {
  page: number | any = 1;
  limit: number | any = 10;
}

export class IPagination<T> {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  total_pages: number | null;
  items: Array<T>;
}

export class IMetaPagination {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  total_pages: number | null;
}

export async function paginateRawCustom<T>(selectQueryBuilder: SelectQueryBuilder<T>, paginate?: RequestPagination) {
  let page = 1;
  let limit = 10;

  if(paginate) {
    page = paginate.page ?? page;
    limit = paginate.limit ?? limit;
  }

  const result = await paginateRaw<T, IMetaPagination>(selectQueryBuilder, {
    page,
    limit,
    metaTransformer: (meta: IPaginationMeta) => {
      return {
        from: 0,
        to: 0,
        per_page: meta.itemsPerPage,
        total: meta.totalItems,
        current_page: meta.currentPage,
        prev_page: meta.currentPage == 1 ? null : meta.currentPage - 1,
        next_page: meta.currentPage >= meta.totalPages ? null : meta.currentPage + 1,
        total_pages: meta.totalPages
      }
    },
   });
   let newObject:IPagination<T> = Object.assign(new IPagination<T>(), result.meta, {items: result.items})
  return newObject;
}


export async function paginateRepository<T>(repository: Repository<T>, reqPaginate?: RequestPagination) {
  let page = 1;
  let limit = 10;
  if(reqPaginate) {
    page = reqPaginate.page ?? page;
    limit = reqPaginate.limit ?? limit;
  }

  const result = await paginate<T, IMetaPagination>(repository, {
    page,
    limit,
    metaTransformer: (meta: IPaginationMeta): IMetaPagination => {
      return {
        from: 0,
        to: 0,
        per_page: meta.itemsPerPage,
        total: meta.totalItems,
        current_page: meta.currentPage,
        prev_page: meta.currentPage == 1 ? null : meta.currentPage - 1,
        next_page: meta.currentPage >= meta.totalPages ? null : meta.currentPage + 1,
        total_pages: meta.totalPages
      }
    },
   });
   let newObject:IPagination<T> = Object.assign({}, result.meta, {items: result.items})
  return newObject;
}
