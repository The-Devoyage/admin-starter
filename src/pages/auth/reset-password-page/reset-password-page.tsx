import { ResetPasswordPageRootProvider } from './provider';
import { ResetPasswordPageBody } from './views';

export const ResetPasswordPage = () => (
  <ResetPasswordPageRootProvider>
    <ResetPasswordPageBody />
  </ResetPasswordPageRootProvider>
);
