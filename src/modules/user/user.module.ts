import { Module, Provider } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/shared/components/prisma/prisma.module';
import { PrismaUserRepository } from 'src/modules/user/user.repo';
import {
  USER_REPOSITORY,
  USER_SERVICE,
} from 'src/modules/user/interface/user-di.token';
import { PrismaClientRepository } from 'src/modules/client/infrastructure/prisma/client.prisma.repo';
import { AuthModule } from 'src/modules/auth/auth.module';

const repositories: Provider[] = [
  { provide: USER_REPOSITORY, useClass: PrismaClientRepository },
];
const services: Provider[] = [{ provide: USER_SERVICE, useClass: UserService }];

@Module({
  imports: [],
  controllers: [UserController],
  providers: [...services, ...repositories],
  exports: [...services, ...repositories],
})
export class UserModule {}
