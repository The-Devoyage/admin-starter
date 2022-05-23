import { CCol, CFormInput, CFormLabel, CRow } from '@coreui/react';
import { FormikProps } from 'formik';
import { FC } from 'react';
import { LoginInput } from 'src/types/generated';

interface LoginFormContentProps {
  form: FormikProps<LoginInput> | null;
  loading?: boolean;
}

export const LoginFormContent: FC<LoginFormContentProps> = ({
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
      <CFormLabel>Password</CFormLabel>
      <CFormInput
        placeholder="*****"
        type="password"
        required
        name="password"
        value={form?.values.password}
        onChange={form?.handleChange}
        disabled={loading}
      />
    </CCol>
  </CRow>
);
