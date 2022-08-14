import { FC, ReactNode, useContext } from 'react';
import { Providers } from '@the-devoyage/orions-arrow';
import { StringFilterByEnum } from 'src/types/generated';
import { ACCOUNT_PAGE_GET_ACCOUNTS } from '../../operations';
import { AccountPageContext } from '../account-page-provider';

interface GetAccountsProviderProps {
  children: ReactNode;
}

export const GetAccountsProvider: FC<GetAccountsProviderProps> = ({
  children,
}) => {
  const { account_id } = useContext(AccountPageContext);

  return (
    <Providers.Accounts.Queries.GetAccountsProvider
      query={{
        documentNode: ACCOUNT_PAGE_GET_ACCOUNTS,
        variables: {
          getAccountsInput: {
            query: {
              _id: [
                { string: account_id!, filterBy: StringFilterByEnum.Objectid },
              ],
            },
          },
          getUsersInput: {
            query: {},
            config: {
              pagination: { limit: 100 },
            },
          },
        },
      }}
    >
      {children}
    </Providers.Accounts.Queries.GetAccountsProvider>
  );
};
