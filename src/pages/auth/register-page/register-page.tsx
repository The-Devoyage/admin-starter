import { RegisterPageRootProvider } from './provider';
import { RegisterPageBody } from './views';

const RegisterPage = () => (
  <RegisterPageRootProvider>
    <RegisterPageBody />
  </RegisterPageRootProvider>
);

export default RegisterPage;
