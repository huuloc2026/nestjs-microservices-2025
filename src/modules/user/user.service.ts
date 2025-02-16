import { Inject, Injectable } from '@nestjs/common';

import { UserRepository } from 'src/modules/user/user.repo';
import { $Enums, User } from '@prisma/client';
import { BaseServiceAbstract } from 'src/shared/services/base.abstract.service';
import { IUserRepository, IUserService } from 'src/modules/user/user.port';
import {
  UserRegistrationDTO,
  UserLoginDTO,
  UserUpdateDTO,
  UserCondDTO,
} from 'src/modules/user/dto/user.dto';
import { Requester, TokenPayload } from 'src/shared/interface/interface';
import { FindAllResponse } from 'src/shared/types/common.types';
import { PagingSchemaDTO } from 'src/shared/data-model';

@Injectable()
export class UserService extends BaseServiceAbstract<User> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }
  async findbyEmail(email: string) {
    return await this.userRepository.findOneByCondition({ email });
  }
}
// }
// export class UserService implements BaseServiceAbstract<User> {
//   constructor(
//     @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
//   ) {}
//   create(
//     create_dto:
//       | {
//           name: string;
//           id: string;
//           email: string;
//           password: string;
//           phone: string | null;
//           role: $Enums.Role;
//           gender: $Enums.Gender | null;
//           salt: string;
//           verifyCode: string | null;
//           avatar: string | null;
//           createdAt: Date;
//           updatedAt: Date;
//         }
//       | any,
//   ): Promise<{
//     name: string;
//     id: string;
//     email: string;
//     password: string;
//     phone: string | null;
//     role: $Enums.Role;
//     gender: $Enums.Gender | null;
//     salt: string;
//     verifyCode: string | null;
//     avatar: string | null;
//     createdAt: Date;
//     updatedAt: Date;
//   }> {
//     throw new Error('Method not implemented.');
//   }
//   findAll(
//     filter?: object,
//     options?: PagingSchemaDTO,
//   ): Promise<FindAllResponse<User>> {
//     throw new Error('Method not implemented.');
//   }
//   findOnebyId(id: string) {
//     throw new Error('Method not implemented.');
//   }
//   findOneByCondition(filter: Partial<User>) {
//     throw new Error('Method not implemented.');
//   }
//   update(id: string, update_dto: Partial<User>) {
//     throw new Error('Method not implemented.');
//   }
//   remove(id: string) {
//     throw new Error('Method not implemented.');
//   }
//   async findbyEmail(email: string) {
//     return await this.userRepository.findOneByCondition({ email });
//   }
// }
