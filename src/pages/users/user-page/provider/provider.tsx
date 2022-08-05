import { FC, ReactNode } from 'react';
import { Utils } from 'src/common';
import { GetUserProvider } from './get-user-provider';
import { UpdateUserProvider } from './update-user-provider';
import { UserPageProvider } from './user-page-provider';

interface UserPageRootProviderProps {
  children: ReactNode;
}

export const UserPageRootProvider: FC<UserPageRootProviderProps> = ({
  children,
}) => (
  <Utils.Compose
    components={[UserPageProvider, GetUserProvider, UpdateUserProvider]}
  >
    {children}
  </Utils.Compose>
);
