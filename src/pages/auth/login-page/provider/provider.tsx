import { FC, ReactNode } from 'react';
import { Utils } from 'src/common';
import { LoginAccountProvider } from './login-account-provider';
import { LoginPageProvider } from './login-page-provider';
import { LoginUserProvider } from './login-user-provider';

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
