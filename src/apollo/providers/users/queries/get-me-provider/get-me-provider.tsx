import { useQuery, DocumentNode } from '@apollo/client';
import { createContext, FC, ReactNode, useContext, useMemo } from 'react';
import { UserBase } from 'src/apollo/types';

interface IGetMeContext<User extends UserBase> {
  me: User | null;
  loading: boolean;
}

const GetMeContext = createContext<IGetMeContext<UserBase>>({
  me: null,
  loading: false,
});

export const useGetMeContext = <User extends UserBase>() => {
  const context = useContext<IGetMeContext<User>>(
    GetMeContext as unknown as React.Context<IGetMeContext<User>>,
  );

  if (!context) {
    throw new Error('Failed to find provider.');
  }

  return context;
};

interface GetMeProvider {
  children: ReactNode;
  query: {
    documentNode: DocumentNode;
  };
}

export const GetMeProvider: FC<GetMeProvider> = ({ children, query }) => {
  const { data, loading } = useQuery(query.documentNode);

  const me = data?.me || null;

  const value = useMemo(() => ({ me, loading }), [me, loading]);

  return (
    <GetMeContext.Provider value={value}>{children}</GetMeContext.Provider>
  );
};
