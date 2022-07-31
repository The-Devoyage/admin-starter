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
import { ResetPasswordInput } from 'src/types/generated';

interface ResetPasswordCardProps {
  form: FormikProps<ResetPasswordInput> | null;
  loading: boolean;
}

export const ResetPasswordCard: FC<ResetPasswordCardProps> = ({
  form,
  loading,
}) => {
  const navigate = useNavigate();

  return (
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
            <CButton
              onClick={() => navigate('/reset-activation-code')}
              color="link"
            >
              Reset Activation Code
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
  );
};
