import { FC, ReactNode } from 'react';
import { Utils } from 'src/common';
import { GetUserProvider } from './get-user-provider';
import { InviteUserProvider } from './invite-user-provider';
import { UserPageProvider } from './user-page-provider';
import { UpdateUserProvider } from './update-user-provider';

interface UserPageRootProviderProps {
  children: ReactNode;
}

export const UserPageRootProvider: FC<UserPageRootProviderProps> = ({
  children,
}) => (
  <Utils.Compose
    components={[
      UserPageProvider,
      GetUserProvider,
      UpdateUserProvider,
      InviteUserProvider,
    ]}
  >
    {children}
  </Utils.Compose>
);
