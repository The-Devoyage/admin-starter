import { CCol, CFormInput, CFormLabel, CRow } from '@coreui/react';
import { FormikProps } from 'formik';
import { FC } from 'react';
import { RegisterInput } from 'src/types/generated';

interface RegisterFormContentProps {
  form: FormikProps<RegisterInput> | null;
  loading?: boolean;
  disablePasswords?: boolean;
}

export const RegisterFormContent: FC<RegisterFormContentProps> = ({
  form,
  loading,
  disablePasswords,
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
        value={form?.values.password ?? undefined}
        onChange={form?.handleChange}
        feedbackInvalid={form?.errors.password}
        disabled={loading || disablePasswords}
        invalid={!!form?.errors.password}
      />
    </CCol>
    <CCol lg={12} className="mb-3">
      <CFormLabel>Password Again</CFormLabel>
      <CFormInput
        placeholder="*****"
        type="password"
        required
        feedbackInvalid={form?.errors.password}
        name="password2"
        onChange={(e) => {
          if (e.currentTarget.value !== form?.values.password) {
            form?.setErrors({ password: 'Passwords do not match.' });
          } else {
            form?.setErrors({});
          }
        }}
        disabled={loading || disablePasswords}
        invalid={!!form?.errors.password}
      />
    </CCol>
  </CRow>
);
