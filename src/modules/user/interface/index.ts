import { User } from '@prisma/client';
import { PagingSchemaDTO } from 'src/shared/data-model';
import { BaseRepositoryPrisma } from 'src/shared/repository/base.repository-prisma';
import { BaseUseCase, IBaseUseCase } from 'src/shared/services/base-usecase';
import { FindAllResponse } from 'src/shared/types/common.types';

//Repository
export class UserRepository extends BaseRepositoryPrisma<User, any, any> {}

//Service
export interface IUserService extends IBaseUseCase<User> {}

export abstract class UserUseCase<User>
  extends BaseUseCase<User>
  implements IBaseUseCase<User> {}
