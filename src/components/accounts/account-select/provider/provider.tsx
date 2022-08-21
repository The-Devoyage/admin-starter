import { FC, ReactNode } from 'react';
import { SingleValue } from 'react-select';
import { Utils } from 'src/common';
import { Account } from 'src/types/generated';
import { GetAccountsProvider } from './get-accounts-provider';

interface AccountSelectRootProviderProps {
  children: ReactNode;
  value: SingleValue<Pick<Account, '_id'>>;
}

export const AccountSelectRootProvider: FC<AccountSelectRootProviderProps> = ({
  children,
  value,
}) => (
  <Utils.Compose components={[GetAccountsProvider]} value={value}>
    {children}
  </Utils.Compose>
);
