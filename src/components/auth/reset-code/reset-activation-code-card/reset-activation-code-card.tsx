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

export const ResetActivationCodeCard = () => {
  const navigate = useNavigate();

  return (
    <Providers.Accounts.Mutations.ResetActivationCodeProviderContext.Consumer>
      {({ form, loading }) => (
        <CForm
          onSubmit={(e) => {
            e.preventDefault();
            form?.submitForm();
          }}
        >
          <CCard>
            <CCardHeader>Reset Code</CCardHeader>
            <CCardBody>
              <Auth.ResetCode.LoginFormContent form={form} loading={loading} />
            </CCardBody>
            <CCardFooter className="d-flex justify-content-between align-items-center">
              <CButton onClick={() => navigate('/verify-email')} color="link">
                Verify Email
              </CButton>
              <CButton type="submit" disabled={loading}>
                {loading ? <CSpinner size="sm" /> : 'Reset'}
              </CButton>
            </CCardFooter>
          </CCard>
        </CForm>
      )}
    </Providers.Accounts.Mutations.ResetActivationCodeProviderContext.Consumer>
  );
};
