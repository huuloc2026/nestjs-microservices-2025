import { UserRole } from 'src/shared/data-model';

export interface TokenPayload {
  sub: string;
  role: UserRole;
}

export interface Requester extends TokenPayload {}
