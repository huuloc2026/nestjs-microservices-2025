import {
  ExecutionContext,
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/shared/decorators/public.decrators';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(AtGuard.name);
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    return super.canActivate(context);
  }
  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ) {
    
    if (err || !user) {
      if (info?.name === 'TokenExpiredError') {
        this.logger.warn('Access token has expired');
        throw new UnauthorizedException('Access token expired');
      }
      if (info?.name === 'JsonWebTokenError') {
        this.logger.warn('Invalid access token');
        throw new UnauthorizedException('Invalid access token');
      }
      if (info?.name === 'NotBeforeError') {
        this.logger.warn('Access token is not yet active');
        throw new UnauthorizedException('Access token not yet active');
      }
      this.logger.warn('Access token is missing or user not authenticated');
      throw new UnauthorizedException('Authentication failed');
    }
   

    this.logger.log(`User authenticated: ${user.sub}`);
    return user;
  }
}
