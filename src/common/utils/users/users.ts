import { Account, User } from 'src/types/generated';

export const determineName = (
  account: Pick<Account, 'email'> | null,
  user: Pick<User, 'email' | 'first_name' | 'last_name'> | null,
) => {
  const hasName = !!user?.first_name || !!user?.last_name;
  if (user) {
    if (hasName) {
      return `${user.first_name ?? ''}${hasName ? ' ' : ''}${
        user.last_name ?? ''
      }`;
    }
    return user.email;
  }

  if (account?.email) {
    return account?.email;
  }

  return 'Unknown User';
};
