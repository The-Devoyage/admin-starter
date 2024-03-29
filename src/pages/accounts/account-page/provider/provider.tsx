import { FC, ReactNode } from 'react';
import { Utils } from 'src/common';
import { AccountPageProvider } from './account-page-provider';
import { CreateUserProvider } from './create-user-provider';
import { GetAccountsProvider } from './get-accounts-provider';
import { InviteUserProvider } from './invite-user-provider';
import { ResetActivationCodeProvider } from './reset-activation-code-provider';

interface AccountPageRootProviderProps {
  children: ReactNode;
}

export const AccountPageRootProvider: FC<AccountPageRootProviderProps> = ({
  children,
}) => (
  <Utils.Compose
    components={[
      AccountPageProvider,
      InviteUserProvider,
      GetAccountsProvider,
      ResetActivationCodeProvider,
      CreateUserProvider,
    ]}
  >
    {children}
  </Utils.Compose>
);
