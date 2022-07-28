import { FC, ReactNode } from 'react';
import { Providers } from 'src/apollo';
import { ACCOUNTS_PAGE_GET_ACCOUNTS } from '../../operations';

interface GetAccountsProvider {
  children: ReactNode;
}

export const GetAccountsProvider: FC<GetAccountsProvider> = ({ children }) => {
  return (
    <Providers.Accounts.Queries.GetAccountsProvider
      query={{
        documentNode: ACCOUNTS_PAGE_GET_ACCOUNTS,
        variables: {
          getUsersInput: { query: {} },
          getAccountsInput: { query: {} },
        },
      }}
    >
      {children}
    </Providers.Accounts.Queries.GetAccountsProvider>
  );
};
