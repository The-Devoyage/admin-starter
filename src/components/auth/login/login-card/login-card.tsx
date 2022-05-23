import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CForm,
  CSpinner,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { Providers } from 'src/apollo';
import { Auth } from 'src/components';

export const LoginCard = () => {
  const navigate = useNavigate();

  return (
    <Providers.Accounts.Mutations.LoginProviderContext.Consumer>
      {({ form, loading }) => (
        <CForm
          onSubmit={(e) => {
            e.preventDefault();
            form?.submitForm();
          }}
        >
          <CCard>
            <CCardHeader>Login</CCardHeader>
            <CCardBody>
              <Auth.Login.LoginFormContent form={form} loading={loading} />
            </CCardBody>
            <CCardFooter className="d-flex justify-content-between align-items-center">
              <div>
                <CButton onClick={() => navigate('/register')} color="link">
                  Register
                </CButton>
                <CButton onClick={() => navigate('/verify-email')} color="link">
                  Verify Email
                </CButton>
                <CButton
                  onClick={() => navigate('/reset-password')}
                  color="link"
                >
                  Reset Password
                </CButton>
              </div>
              <CButton type="submit" disabled={loading}>
                {loading ? <CSpinner size="sm" /> : 'Login'}
              </CButton>
            </CCardFooter>
          </CCard>
        </CForm>
      )}
    </Providers.Accounts.Mutations.LoginProviderContext.Consumer>
  );
};
