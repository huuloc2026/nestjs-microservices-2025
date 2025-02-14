import { Role } from '@prisma/client';

export interface TokenPayload {
  sub: string;
  role: Role;
}

export interface Requester extends TokenPayload {}
