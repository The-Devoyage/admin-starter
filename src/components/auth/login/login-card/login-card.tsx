import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CForm,
  CSpinner,
} from '@coreui/react';
import { FormikProps } from 'formik';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'src/components';
import { LoginInput } from 'src/types/generated';

interface LoginCardProps {
  form: FormikProps<LoginInput> | null;
  loading: boolean;
}

export const LoginCard: FC<LoginCardProps> = ({ form, loading }) => {
  const navigate = useNavigate();

  return (
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
            <CButton onClick={() => navigate('/reset-password')} color="link">
              Reset Password
            </CButton>
          </div>
          <CButton type="submit" disabled={loading}>
            {loading ? <CSpinner size="sm" /> : 'Login'}
          </CButton>
        </CCardFooter>
      </CCard>
    </CForm>
  );
};
