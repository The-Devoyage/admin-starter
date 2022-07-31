import { ResetPasswordPageRootProvider } from './provider/provider';
import { ResetPasswordPageBody } from './views';

export const ResetPasswordPage = () => (
  <ResetPasswordPageRootProvider>
    <ResetPasswordPageBody />
  </ResetPasswordPageRootProvider>
);
