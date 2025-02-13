export enum SORT_TYPE {
  'DESC' = 'desc',
  'ASC' = 'acs',
}

export type FindAllResponse<T> = { data: number; total: T[] };

export type SortParams = { sort_by: string; sort_type: SORT_TYPE };

export type SearchParams = { keywork: string; field: string };

export type PaginateParams = { offset: number; limit: number };
