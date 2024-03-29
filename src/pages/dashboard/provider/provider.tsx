import { FC, ReactNode } from 'react';
import { Utils } from 'src/common';
import { GetAccountsProvider } from './get-accounts-provider';
import { GetMeProvider } from './get-me-provider';
import { GetMediaProvider } from './get-media-provider';
import { GetUsersProvider } from './get-users-provider';

interface DashboardPageRootProviderProps {
  children: ReactNode;
}

export const DashboardPageRootProvider: FC<DashboardPageRootProviderProps> = ({
  children,
}) => (
  <Utils.Compose
    components={[
      GetAccountsProvider,
      GetMeProvider,
      GetMediaProvider,
      GetUsersProvider,
    ]}
  >
    {children}
  </Utils.Compose>
);
