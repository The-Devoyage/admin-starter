import { VerifyEmailPageRootProvider } from './provider';
import { VerifyEmailPageBody } from './views';

export const VerifyEmailPage = () => (
  <VerifyEmailPageRootProvider>
    <VerifyEmailPageBody />
  </VerifyEmailPageRootProvider>
);
