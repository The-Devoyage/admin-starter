import { ApolloError, useReactiveVar } from '@apollo/client';
import { FC, createContext, ReactNode, useMemo } from 'react';
import { Variables } from 'src/apollo';
import {
  GetAccountsInput,
  Stats,
  useAccountCountWidget_GetAccountsQuery,
} from 'src/types/generated';

interface AccountCountWidgetProviderProps {
  getAccountsInput: GetAccountsInput;
  children: ReactNode;
}

interface AccountCountWidgetProviderContext {
  stats: Pick<Stats, 'total' | 'history'> | null;
  loading: boolean;
  error?: ApolloError;
}

export const AccountCountWidgetProviderContext =
  createContext<AccountCountWidgetProviderContext>({
    stats: null,
    loading: false,
  });

export const AccountCountWidgetProvider: FC<
  AccountCountWidgetProviderProps
> = ({ getAccountsInput, children }) => {
  const isAuthenticated = useReactiveVar(Variables.Auth.isAuthenticatedVar);
  const { data, loading } = useAccountCountWidget_GetAccountsQuery({
    variables: { getAccountsInput },
    skip: !isAuthenticated,
  });

  const stats = data?.getAccounts.stats ?? null;

  const value = useMemo(() => ({ stats, loading }), [stats, loading]);

  return (
    <AccountCountWidgetProviderContext.Provider value={value}>
      {children}
    </AccountCountWidgetProviderContext.Provider>
  );
};
