import { CCol, CFormInput, CFormLabel, CRow } from '@coreui/react';
import { FormikProps } from 'formik';
import { FC } from 'react';
import { ResetPasswordInput } from 'src/types/generated';

interface ResetPasswordFormContentProps {
  form: FormikProps<ResetPasswordInput> | null;
  loading?: boolean;
}

export const ResetPasswordFormContent: FC<ResetPasswordFormContentProps> = ({
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
        invalid={!!form?.errors.password}
        feedbackInvalid={form?.errors.password}
      />
    </CCol>
    <CCol lg={12} className="mb-3">
      <CFormLabel>Password Again</CFormLabel>
      <CFormInput
        feedbackInvalid={form?.errors.password}
        placeholder="*****"
        type="password"
        required
        name="password2"
        disabled={loading}
        invalid={!!form?.errors.password}
        onChange={(e) => {
          if (e.currentTarget.value !== form?.values.password) {
            form?.setErrors({ password: 'Passwords do not match.' });
          } else {
            form?.setErrors({});
          }
        }}
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
