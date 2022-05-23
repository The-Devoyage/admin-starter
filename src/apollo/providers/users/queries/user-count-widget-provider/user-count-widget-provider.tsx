import { ApolloError, useReactiveVar } from '@apollo/client';
import { FC, createContext, ReactNode, useMemo } from 'react';
import { Variables } from 'src/apollo';
import {
  GetUsersInput,
  Stats,
  useUserCountWidget_GetUsersQuery,
} from 'src/types/generated';

interface UserCountWidgetProviderProps {
  getUsersInput: GetUsersInput;
  children: ReactNode;
}

interface UserCountWidgetProviderContext {
  stats: Pick<Stats, 'total' | 'history'> | null;
  loading: boolean;
  error?: ApolloError;
}

export const UserCountWidgetProviderContext =
  createContext<UserCountWidgetProviderContext>({
    stats: null,
    loading: false,
  });

export const UserCountWidgetProvider: FC<UserCountWidgetProviderProps> = ({
  getUsersInput,
  children,
}) => {
  const isAuthenticated = useReactiveVar(Variables.Auth.isAuthenticatedVar);
  const { data, loading } = useUserCountWidget_GetUsersQuery({
    variables: { getUsersInput },
    skip: !isAuthenticated,
  });

  const stats = data?.getUsers.stats ?? null;

  const value = useMemo(() => ({ stats, loading }), [stats, loading]);

  return (
    <UserCountWidgetProviderContext.Provider value={value}>
      {children}
    </UserCountWidgetProviderContext.Provider>
  );
};
