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
import { TokenRepoService } from 'src/modules/token-repo/token-repo.service';
import { USER_SERVICE } from 'src/modules/user/interface/user-di.token';
import { UserService } from 'src/modules/user/user.service';
import { TokenPayload } from 'src/shared/interface/interface';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private config: ConfigService,
    @Inject(USER_SERVICE) private userService: UserService,
    private tokenService: TokenRepoService,
    private commonService: CommonService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('AT_SECRET'),
    });
  }
  async validate(payload: TokenPayload) {
    // check in Token Repository
    const checkKeyExist = await this.tokenService.CheckKeyValid(payload.sub);
    if (!checkKeyExist) {
      Logger.warn('Token not found for user', 'AtStrategy');
      throw new UnauthorizedException('Invalid or expired token');
    }
    // get User
    const user = await this.userService.findOneById(payload.sub);
    if (user.status === 'BANNED' || user.status === 'DELETED') {
      Logger.warn(`User with ID ${payload.sub} banned`, 'AtStrategy');
      throw new UnauthorizedException('User banned or Deleteted');
    }
    if (!user) {
      Logger.warn(`User with ID ${payload.sub} not found`, 'AtStrategy');
      throw new UnauthorizedException('User not found');
    }
    // drop another info
    const EssentialUser = this.commonService.getEssentialUserData(user);
    return EssentialUser; // Passport will attach this user to req.user
  }
}
