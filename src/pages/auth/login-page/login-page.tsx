import { CContainer } from '@coreui/react';
import { LoginPageRootProvider } from './provider';
import { LoginPageBody } from './views';

export const LoginPage = () => (
  <LoginPageRootProvider>
    <CContainer>
      <LoginPageBody />
    </CContainer>
  </LoginPageRootProvider>
);
