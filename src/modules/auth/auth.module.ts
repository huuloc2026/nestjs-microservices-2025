import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/modules/user/user.service';

import { UserModule } from 'src/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    UserModule,
    CommonModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
