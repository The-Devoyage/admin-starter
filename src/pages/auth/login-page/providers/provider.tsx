import { FC, ReactNode } from 'react';
import { LoginUserProvider } from 'src/apollo/providers/users/mutations';
import { Utils } from 'src/common';
import { LoginAccountProvider } from './login-account-provider';
import { LoginPageProvider } from './login-page-provider';

interface LoginPageRootProviderProps {
  children: ReactNode;
}

export const LoginPageRootProvider: FC<LoginPageRootProviderProps> = ({
  children,
}) => (
  <Utils.Compose
    components={[LoginPageProvider, LoginUserProvider, LoginAccountProvider]}
  >
    {children}
  </Utils.Compose>
);
