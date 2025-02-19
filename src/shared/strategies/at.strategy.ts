import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenRepoService } from 'src/modules/token-repo/token-repo.service';
import { USER_SERVICE } from 'src/modules/user/interface/user-di.token';
import { UserService } from 'src/modules/user/user.service';
import { TokenPayload } from 'src/shared/interface/interface';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private config: ConfigService,
    @Inject(USER_SERVICE) private userService: UserService,
    private tokensService: TokenRepoService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('AT_SECRET'),
    });
  }
  async validate(payload: TokenPayload) {
    const checkKeyExist = await this.tokensService.CheckTokenOfUser(
      payload.sub,
    );
    if (!checkKeyExist) {
      Logger.warn('Key not exist', AtStrategy);
      throw new NotFoundException('key not exist');
    }
    const role = await this.userService.getUserWithRole(payload.sub);
    return role;
  }
}
