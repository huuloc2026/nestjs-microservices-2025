import { Role } from '@prisma/client';

export interface TokenPayload {
  sub: string;
  email: string;
  role: Role;
}

export interface Requester extends TokenPayload {}
