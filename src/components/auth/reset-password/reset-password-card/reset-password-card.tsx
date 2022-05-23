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

export const ResetPasswordCard = () => {
  const navigate = useNavigate();

  return (
    <Providers.Accounts.Mutations.ResetPasswordProviderContext.Consumer>
      {({ form, loading }) => (
        <CForm
          onSubmit={(e) => {
            e.preventDefault();
            form?.submitForm();
          }}
        >
          <CCard>
            <CCardHeader>Reset Password</CCardHeader>
            <CCardBody>
              <Auth.ResetPassword.ResetPasswordFormContent
                form={form}
                loading={loading}
              />
            </CCardBody>
            <CCardFooter className="d-flex justify-content-between align-items-center">
              <div>
                <CButton onClick={() => navigate('/login')} color="link">
                  Login
                </CButton>
                <CButton onClick={() => navigate('/verify-email')} color="link">
                  Verify Email
                </CButton>
              </div>
              <CButton
                type="submit"
                disabled={!form?.dirty || loading || !!form?.errors.password}
              >
                {loading ? <CSpinner size="sm" /> : 'Reset Password'}
              </CButton>
            </CCardFooter>
          </CCard>
        </CForm>
      )}
    </Providers.Accounts.Mutations.ResetPasswordProviderContext.Consumer>
  );
};
