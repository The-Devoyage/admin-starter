import { FC, ReactNode } from 'react';
import { Providers } from '@the-devoyage/orions-arrow';
import { USERS_PAGE_GET_USERS } from '../../operations';

interface GetUsersProviderProps {
  children: ReactNode;
}

export const GetUsersProvider: FC<GetUsersProviderProps> = ({ children }) => {
  return (
    <Providers.Users.Queries.GetUsersProvider
      query={{
        documentNode: USERS_PAGE_GET_USERS,
        variables: {
          getUsersInput: {
            query: {},
            config: {
              pagination: {
                limit: 20,
              },
            },
          },
        },
      }}
    >
      {children}
    </Providers.Users.Queries.GetUsersProvider>
  );
};
