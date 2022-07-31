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
import { ResetCodeInput } from 'src/types/generated';

interface ResetActivationCodeCardProps {
  form: FormikProps<ResetCodeInput> | null;
  loading: boolean;
}

export const ResetActivationCodeCard: FC<ResetActivationCodeCardProps> = ({
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
  );
};
