import { ResetPasswordPageRootProvider } from './provider/provider';
import { ResetPasswordPageBody } from './views';

const ResetPasswordPage = () => (
  <ResetPasswordPageRootProvider>
    <ResetPasswordPageBody />
  </ResetPasswordPageRootProvider>
);

export default ResetPasswordPage;
