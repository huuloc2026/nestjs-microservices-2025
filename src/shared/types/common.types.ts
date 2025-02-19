import { Request as ExpressRequest } from 'express';
import { TokenPayload } from 'src/shared/interface/interface';

export interface AuthenticatedRequest extends ExpressRequest {
  user?: TokenPayload;
}

export enum SORT_TYPE {
  'DESC' = 'desc',
  'ASC' = 'acs',
}

export type FindAllResponse<T> = {
  data: T[];
  page: number;
  limit: number;
  total: number;
};

export type SortParams = { sort_by: string; sort_type: SORT_TYPE };

export type SearchParams = { keywork: string; field: string };

export type PaginateParams = { offset: number; limit: number };
