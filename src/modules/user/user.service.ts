import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { BaseServiceAbstract } from 'src/shared/services/base/base.abstract.service';
import { UserRepository } from 'src/modules/user/user.repo';

@Injectable()
export class UserService extends BaseServiceAbstract<User> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }
  async findbyEmail(email: string) {
    return await this.userRepository.findOneByCondition({ email });
  }
}
// import {
//   ConflictException,
//   ForbiddenException,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';
// import {
//   CreateUserDto,
//   UserRegistrationDTO,
//   UserUpdateDTO,
// } from 'src/modules/user/dto/user.dto';
// import { PrismaService } from 'src/shared/components/prisma/prisma.service';

// @Injectable()
// export class UserService {
//   constructor(private prisma: PrismaService) {}

//   async create(createUserDto: UserRegistrationDTO) {
//     console.log(createUserDto);
//     const checkExist = await this.findExist(createUserDto.email);
//     if (checkExist) {
//       throw new ForbiddenException('This email is exist.');
//     }
//     return this.prisma.user.create({
//       data: createUserDto,
//     });
//   }
//   async findExist(email: string) {
//     return this.prisma.user.findUnique({ where: { email } });
//   }

//   async findAll() {
//     return this.prisma.user.findMany();
//   }

//   async findOne(id: string) {
//     const user = await this.prisma.user.findUnique({
//       where: { id },
//     });
//     if (!user) {
//       throw new NotFoundException(`User with ID ${id} not found`);
//     }
//     return user;
//   }

//   async update(id: string, updateUserDto: UserUpdateDTO) {
//     await this.findOne(id); // Ensure user exists
//     return this.prisma.user.update({
//       where: { id },
//       data: updateUserDto,
//     });
//   }

//   async remove(id: string) {
//     await this.findOne(id); // Ensure user exists
//     return this.prisma.user.delete({
//       where: { id },
//     });
//   }
// }
