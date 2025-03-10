import { Module, Provider } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/modules/user/user.service';

import { UserModule } from 'src/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from 'src/common/common.module';
import { TokenRepoModule } from 'src/modules/token-repo/token-repo.module';
import {
  CLIENT_REPOSITORY,
  CLIENT_SERVICE,
} from 'src/modules/client/client-di';
import { PrismaClientRepository } from 'src/modules/client/infrastructure/prisma/client.prisma.repo';
import { ClientService } from 'src/modules/client/application/client.service';
import { RedisModule } from 'src/shared/components/redis/redis.module';
import { BullModule } from '@nestjs/bullmq';
import {
  QUEUENAME,
  SEND_EMAIL_QUEUENAME,
} from 'src/shared/components/bullmq/constants';
import { sendEmailProcessor } from 'src/shared/components/bullmq/queues/send-email.process';
import { NodemailerService } from 'src/shared/components/nodemailer/nodemailer.service';
import { SharedModule } from 'src/shared/shared.module';

const repositories: Provider[] = [
  { provide: CLIENT_REPOSITORY, useClass: PrismaClientRepository },
];

const services: Provider[] = [
  { provide: CLIENT_SERVICE, useClass: ClientService },
];

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    BullModule.registerQueue({
      name: QUEUENAME.sendEmail,
      prefix: '::User',
    }),
    UserModule,
    CommonModule,
    TokenRepoModule,
    SharedModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, sendEmailProcessor],
})
export class AuthModule {}
