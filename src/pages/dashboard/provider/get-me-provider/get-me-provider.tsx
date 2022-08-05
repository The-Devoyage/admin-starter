import { FC, ReactNode } from 'react';
import { Providers } from 'src/apollo';
import { DASHBOARD_GET_ME } from '../../operations';

interface GetMeProviderProps {
  children: ReactNode;
}

export const GetMeProvider: FC<GetMeProviderProps> = ({ children }) => {
  return (
    <Providers.Users.Queries.GetMeProvider
      query={{ documentNode: DASHBOARD_GET_ME }}
    >
      {children}
    </Providers.Users.Queries.GetMeProvider>
  );
};
