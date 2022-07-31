import { FC, ReactNode } from 'react';
import { Utils } from 'src/common';
import { CreateUserProvider } from './create-user-provider';
import { GetUsersProvider } from './get-users-provider';

interface UsersPageRootProviderProps {
  children: ReactNode;
}

export const UsersPageRootProvider: FC<UsersPageRootProviderProps> = ({
  children,
}) => (
  <Utils.Compose components={[GetUsersProvider, CreateUserProvider]}>
    {children}
  </Utils.Compose>
);
