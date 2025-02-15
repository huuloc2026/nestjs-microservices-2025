import { User } from '@prisma/client';

export type InforBasic = Partial<Omit<User, 'id' | 'password'>>;
