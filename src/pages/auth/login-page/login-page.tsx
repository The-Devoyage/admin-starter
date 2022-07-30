import { CContainer } from '@coreui/react';
import { LoginPageRootProvider } from './providers';
import { LoginPageBody } from './views';

export const LoginPage = () => (
  <LoginPageRootProvider>
    <CContainer>
      <LoginPageBody />
    </CContainer>
  </LoginPageRootProvider>
);
