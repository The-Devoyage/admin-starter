import { FC, ReactNode } from 'react';
import { Utils } from 'src/common';
import { ResetActivationCodeProvider } from './reset-activation-code-provider';

interface ResetActivationCodePageRootProviderProps {
  children: ReactNode;
}

export const ResetActivationCodePageRootProvider: FC<
  ResetActivationCodePageRootProviderProps
> = ({ children }) => (
  <Utils.Compose components={[ResetActivationCodeProvider]}>
    {children}
  </Utils.Compose>
);
