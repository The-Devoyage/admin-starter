import { useReactiveVar } from '@apollo/client';
import { createContext, FC, ReactNode, useMemo } from 'react';
import { Variables } from 'src/apollo';
import { App_MeQuery, useApp_MeQuery } from 'src/types/generated';

interface IAppMeProviderContext {
  me: App_MeQuery['me'] | null;
  loading: boolean;
}

export const AppMeProviderContext = createContext<IAppMeProviderContext>({
  me: null,
  loading: false,
});

export const AppMeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const isAuthenticated = useReactiveVar(Variables.Auth.isAuthenticatedVar);
  const { data, loading } = useApp_MeQuery({ skip: !isAuthenticated });
  const me = data?.me || null;

  const value = useMemo(() => ({ me, loading }), [me, loading]);

  return (
    <AppMeProviderContext.Provider value={value}>
      {children}
    </AppMeProviderContext.Provider>
  );
};
