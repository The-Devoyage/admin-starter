import { FC, createContext, useMemo } from 'react';
import { Utils } from 'src/common';
import {
  AccountSelect_GetAccountsQuery,
  GetAccountsInput,
  GetUsersInput,
  StringFilterByEnum,
  useAccountSelect_GetAccountsQuery,
} from 'src/types/generated';

export interface IAccountSelectProviderContext {
  accounts: AccountSelect_GetAccountsQuery['getAccounts']['data'];
  loading: boolean;
  handleSearch: (v: string) => void;
  getAccountOwner: (
    account: AccountSelect_GetAccountsQuery['getAccounts']['data'][0] | null,
  ) =>
    | AccountSelect_GetAccountsQuery['getAccounts']['data'][0]['users']['data'][0]
    | null;
}

export interface AccountsSelectProviderProps {
  getAccountsInput: GetAccountsInput;
  getUsersInput: GetUsersInput;
  children: JSX.Element;
}

export const AccountSelectProviderContext =
  createContext<IAccountSelectProviderContext>({
    accounts: [],
    loading: false,
    handleSearch: () => null,
    getAccountOwner: () => null,
  });

export const AccountSelectProvider: FC<AccountsSelectProviderProps> = ({
  getAccountsInput,
  getUsersInput,
  children,
}) => {
  const { data, loading, refetch } = useAccountSelect_GetAccountsQuery({
    variables: {
      getAccountsInput,
      getUsersInput,
    },
  });

  const value = useMemo(() => {
    const handleSearch = (v: string) => {
      if (v) {
        const isId = Utils.isValidObjectId(v);
        let _id;
        if (isId) {
          _id = [{ string: v, filterBy: StringFilterByEnum.Objectid }];
        }

        refetch({
          getUsersInput,
          getAccountsInput: {
            query: {
              _id,
              email: [{ string: v, filterBy: StringFilterByEnum.Regex }],
            },
          },
        });
      } else {
        refetch({
          getAccountsInput: {
            ...getAccountsInput,
            config: {
              pagination: {
                limit: 20,
              },
            },
          },
          getUsersInput,
        });
      }
    };

    const accounts = data?.getAccounts.data ?? [];

    const getAccountOwner = (
      account: AccountSelect_GetAccountsQuery['getAccounts']['data'][0] | null,
    ) => account?.users.data[0] ?? null;
    return { accounts, loading, handleSearch, getAccountOwner };
  }, [
    loading,
    getAccountsInput,
    getUsersInput,
    data?.getAccounts.data,
    refetch,
  ]);

  return (
    <AccountSelectProviderContext.Provider value={value}>
      {children}
    </AccountSelectProviderContext.Provider>
  );
};
