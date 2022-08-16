import { FC, ReactNode } from 'react';
import { Utils } from 'src/common';
import { GetUserProvider } from './get-user-provider';
import { InviteUserProvider } from './invite-user-provider';
import { UpdateUserMembershipProvider } from './update-user-membership-provider';
import { UserPageProvider } from './user-page-provider';

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
      UpdateUserMembershipProvider,
      InviteUserProvider,
    ]}
  >
    {children}
  </Utils.Compose>
);
