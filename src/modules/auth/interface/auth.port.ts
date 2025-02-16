import { User } from '@prisma/client';
import {
  UserLoginDTO,
  UserRegistrationDTO,
  UserUpdateDTO,
} from 'src/modules/user/dto/user.dto';
import { Requester, TokenPayload } from 'src/shared/interface/interface';

export interface IAuthService {
  register(dto: UserRegistrationDTO): Promise<User>;
  login(dto: UserLoginDTO);
  profile(userId: string): Promise<Omit<User, 'password' | 'salt'>>;
  update(
    requester: Requester,
    userId: string,
    dto: UserUpdateDTO,
  ): Promise<void>;
  delete(requester: Requester, userId: string): Promise<void>;
  introspectToken(token: string): Promise<TokenPayload>;
}
export class AuthAbstractService implements IAuthService {
  register(dto: UserRegistrationDTO): Promise<User> {
    throw new Error('Method not implemented.');
  }
  login(dto: UserLoginDTO) {
    throw new Error('Method not implemented.');
  }
  profile(userId: string): Promise<Omit<User, 'password' | 'salt'>> {
    throw new Error('Method not implemented.');
  }
  update(
    requester: Requester,
    userId: string,
    dto: UserUpdateDTO,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(requester: Requester, userId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  introspectToken(token: string): Promise<TokenPayload> {
    throw new Error('Method not implemented.');
  }
}
