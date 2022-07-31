import { FC, ReactNode } from 'react';
import { Utils } from 'src/common';
import { RegisterAccountProvider } from './register-account-provider';

interface RegisterPageRootProviderProps {
  children: ReactNode;
}

export const RegisterPageRootProvider: FC<RegisterPageRootProviderProps> = ({
  children,
}) => (
  <Utils.Compose components={[RegisterAccountProvider]}>
    {children}
  </Utils.Compose>
);
