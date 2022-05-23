import { CCol, CFormInput, CFormLabel, CRow } from '@coreui/react';
import { FormikProps } from 'formik';
import { FC } from 'react';
import { ResetCodeInput } from 'src/types/generated';

interface ResetCodeFormContentProps {
  form: FormikProps<ResetCodeInput> | null;
  loading?: boolean;
}

export const LoginFormContent: FC<ResetCodeFormContentProps> = ({
  form,
  loading,
}) => (
  <CRow>
    <CCol lg={12} className="mb-3">
      <CFormLabel>Email</CFormLabel>
      <CFormInput
        placeholder="user@account.com"
        type="email"
        required
        name="email"
        value={form?.values.email}
        onChange={form?.handleChange}
        disabled={loading}
      />
    </CCol>
  </CRow>
);
