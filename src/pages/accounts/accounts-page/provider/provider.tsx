import { FC, ReactNode } from 'react';
import { Utils } from 'src/common';
import { AccountsPageProvider } from './accounts-page-provider';
import { GetAccountsProvider } from './get-accounts-provider';
import { RegisterAccountProvider } from './register-account-provider';

interface AccountsPageRootProviderProps {
  children: ReactNode;
}

export const AccountsPageRootProvider: FC<AccountsPageRootProviderProps> = ({
  children,
}) => (
  <Utils.Compose
    components={[
      AccountsPageProvider,
      GetAccountsProvider,
      RegisterAccountProvider,
    ]}
  >
    {children}
  </Utils.Compose>
);
