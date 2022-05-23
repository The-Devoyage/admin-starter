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

export const VerifyEmailCard = () => {
  const navigate = useNavigate();

  return (
    <Providers.Accounts.Mutations.VerifyEmailProviderContext.Consumer>
      {({ form, loading }) => (
        <CForm
          onSubmit={(e) => {
            e.preventDefault();
            form?.submitForm();
          }}
        >
          <CCard>
            <CCardHeader>Verify Email</CCardHeader>
            <CCardBody>
              <Auth.VerifyEmail.VerifyEmailFormContent
                form={form}
                loading={loading}
              />
            </CCardBody>
            <CCardFooter className="d-flex justify-content-between align-items-center">
              <div>
                <CButton onClick={() => navigate('/login')} color="link">
                  Login
                </CButton>
                <CButton
                  onClick={() => navigate('/reset-activation-code')}
                  color="link"
                >
                  Reset Activation Code
                </CButton>
              </div>
              <CButton type="submit" disabled={loading}>
                {loading ? <CSpinner size="sm" /> : 'Verify'}
              </CButton>
            </CCardFooter>
          </CCard>
        </CForm>
      )}
    </Providers.Accounts.Mutations.VerifyEmailProviderContext.Consumer>
  );
};
