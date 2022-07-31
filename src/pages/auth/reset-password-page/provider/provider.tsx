import { FC, ReactNode } from 'react';
import { Utils } from 'src/common';
import { ResetPasswordProvider } from './reset-password-provider';

interface ResetPasswordPageRootProviderProps {
  children: ReactNode;
}

export const ResetPasswordPageRootProvider: FC<
  ResetPasswordPageRootProviderProps
> = ({ children }) => (
  <Utils.Compose components={[ResetPasswordProvider]}>{children}</Utils.Compose>
);
