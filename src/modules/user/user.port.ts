import { Requester, TokenPayload } from 'src/shared/interface/interface';

import {
  UserCondDTO,
  UserLoginDTO,
  UserRegistrationDTO,
  UserUpdateDTO,
} from 'src/modules/user/dto/user.dto';
import { User } from '@prisma/client';
import { PagingSchemaDTO } from 'src/shared/data-model';
import { FindAllResponse } from 'src/shared/types/common.types';
export interface IAuthService {
  register(dto: UserRegistrationDTO): Promise<string>;
  login(dto: UserLoginDTO): Promise<string>;
  profile(userId: string): Promise<Omit<User, 'password' | 'salt'>>;
  update(
    requester: Requester,
    userId: string,
    dto: UserUpdateDTO,
  ): Promise<void>;
  delete(requester: Requester, userId: string): Promise<void>;
  // introspect token rpc
  introspectToken(token: string): Promise<TokenPayload>;
}

export interface IUserService<T> {
  create(dto: Partial<T>): Promise<T>;
  findAll(
    filter?: object,
    options?: PagingSchemaDTO,
  ): Promise<FindAllResponse<T>>;
  findOneById(id: string): Promise<T | null>;
  findOneByCondition(filter: Partial<T>): Promise<T | null>;
  update(id: string, dto: Partial<T>): Promise<T>;
  remove(id: string): Promise<boolean>;
}

export interface IUserRepository {
  // 🔹 Query Methods
  get(id: string): Promise<User | null>;
  findByCond(cond: UserCondDTO): Promise<User | null>;
  listByIds(ids: string[]): Promise<User[]>;

  findMany(
    filter: Partial<User>,
    options?: PagingSchemaDTO,
  ): Promise<FindAllResponse<User>>;

  // 🔹 Command Methods
  insert(dto: UserRegistrationDTO): Promise<User>;
  update(id: string, dto: UserUpdateDTO): Promise<User>;
  delete(id: string, isHard?: boolean): Promise<void>; // Mặc định là soft delete
}
