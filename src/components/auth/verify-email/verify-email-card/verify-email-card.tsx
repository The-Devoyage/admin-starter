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
import { VerifyEmailInput } from 'src/types/generated';

interface VerifyEmailCardProps {
  form: FormikProps<VerifyEmailInput> | null;
  loading: boolean;
}

export const VerifyEmailCard: FC<VerifyEmailCardProps> = ({
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
  );
};
