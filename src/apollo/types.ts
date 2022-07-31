import { Account, User } from 'src/types/generated';
import { DeepPartial } from './utils';

export type AccountBase = DeepPartial<Account>;
export type UserBase = DeepPartial<User>;
