import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CommonService } from 'src/common/common.service';
import { AuthService } from 'src/modules/auth/auth.service';
import { TokenRepoService } from 'src/modules/token-repo/token-repo.service';
import { USER_SERVICE } from 'src/modules/user/interface/user-di.token';
import { UserService } from 'src/modules/user/user.service';
import { KEY_PREFIX } from 'src/shared/components/redis/constants';
import { RedisService } from 'src/shared/components/redis/redis.service';
import { TokenPayload } from 'src/shared/interface/interface';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private config: ConfigService,
    @Inject(USER_SERVICE) private userService: UserService,
    private tokenService: TokenRepoService,
    private redisService: RedisService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('AT_SECRET'),
    });
  }
  async validate(payload: TokenPayload) {
    // check in Token Repository
    // const key = `${KEY_PREFIX}${payload.sub}`;
    const tokenData = await this.redisService.get<string>(payload.sub);
    if (!tokenData) {
      Logger.warn(`Token not found for user ${payload.sub}`, 'AtStrategy');
      throw new UnauthorizedException('Invalid or expired token');
    }
    // get User
    const userInfo = await this.userService.profile(payload.email);
    const user: TokenPayload = {
      sub: userInfo.id,
      email: userInfo.email,
      role: userInfo.role,
    };
    Logger.log('Passed Guard', 'AtStrategy');
    return user; // Passport will attach this user to req.user
  }
}
