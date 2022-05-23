import { CCol, CFormInput, CFormLabel, CRow } from '@coreui/react';
import { FormikProps } from 'formik';
import { FC } from 'react';
import { VerifyEmailInput } from 'src/types/generated';

interface RegisterFormContentProps {
  form: FormikProps<VerifyEmailInput> | null;
  loading?: boolean;
}

export const VerifyEmailFormContent: FC<RegisterFormContentProps> = ({
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
    <CCol lg={12} className="mb-3">
      <CFormLabel>Code</CFormLabel>
      <CFormInput
        placeholder="123456"
        required
        name="code"
        value={form?.values.code}
        onChange={form?.handleChange}
        disabled={loading}
      />
    </CCol>
  </CRow>
);
