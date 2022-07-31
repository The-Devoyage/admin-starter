import { FC, ReactNode } from 'react';
import { Utils } from 'src/common';
import { VerifyEmailProvider } from './verify-email-provider';

interface VerifyEmailPageRootProviderProps {
  children: ReactNode;
}

export const VerifyEmailPageRootProvider: FC<
  VerifyEmailPageRootProviderProps
> = ({ children }) => (
  <Utils.Compose components={[VerifyEmailProvider]}>{children}</Utils.Compose>
);
