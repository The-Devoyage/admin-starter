import { FC, createContext, useEffect, useMemo, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AccountPage_GetAccountsQuery,
  GetAccountsInput,
  GetUsersInput,
  useAccountPage_GetAccountsQuery,
} from 'src/types/generated';

interface AccountPageProviderProps {
  getAccountsInput: GetAccountsInput;
  getUsersInput: GetUsersInput;
  children: ReactNode;
}

interface IAccountPageProviderContext {
  account: AccountPage_GetAccountsQuery['getAccounts']['data'][0] | null;
  loading: boolean;
  defaultUser:
    | AccountPage_GetAccountsQuery['getAccounts']['data'][0]['users']['data'][0]
    | null;
  accountMembers:
    | AccountPage_GetAccountsQuery['getAccounts']['data'][0]['users']['data'][0][]
    | [];
}

export const AccountPageProviderContext =
  createContext<IAccountPageProviderContext>({
    loading: false,
    account: null,
    defaultUser: null,
    accountMembers: [],
  });

export const AccountPageProvider: FC<AccountPageProviderProps> = ({
  getAccountsInput,
  getUsersInput,
  children,
}) => {
  const navigate = useNavigate();
  const { data, loading } = useAccountPage_GetAccountsQuery({
    variables: {
      getUsersInput,
      getAccountsInput,
    },
  });

  const account = data?.getAccounts.data[0] ?? null;

  const defaultUser =
    account?.users.data.find(
      (u) =>
        !!u.memberships.find(
          (m) => m.account._id === account._id && m.default === true,
        ),
    ) ?? null;

  useEffect(() => {
    if (!account && !loading) {
      navigate('/lost', { replace: true });
    }
  }, [account, loading, navigate]);

  const value = useMemo(() => {
    const accountMembers =
      account?.users.data.filter((u) => {
        if (
          !u.memberships.find((m) => m.account._id === account._id)?.default
        ) {
          return true;
        }
        return false;
      }) ?? [];

    return { loading, account, defaultUser, accountMembers };
  }, [loading, account, defaultUser]);

  return (
    <AccountPageProviderContext.Provider value={value}>
      {children}
    </AccountPageProviderContext.Provider>
  );
};
