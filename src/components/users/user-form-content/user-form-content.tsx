import {
  CCol,
  CFormInput,
  CFormLabel,
  CRow,
  CFormTextarea,
} from '@coreui/react';
import { FormikProps } from 'formik';
import { FC } from 'react';
import { Phone } from 'src/common/inputs/phone/phone';
import { CreateUserInput, UpdateUserInput } from 'src/types/generated';
import phone from 'phone';

interface UserFormContentProps {
  form: FormikProps<UpdateUserInput> | FormikProps<CreateUserInput> | null;
  loading: boolean;
}

export const UserFormContent: FC<UserFormContentProps> = ({
  form,
  loading,
}) => (
  <CRow>
    <CCol lg={12} className="mb-3">
      <CFormLabel>Email</CFormLabel>
      <CFormInput
        type="email"
        name="payload.email"
        placeholder="user@account.com"
        value={form?.values.payload.email ?? ''}
        onChange={form?.handleChange}
        disabled={loading}
        required
        invalid={!!form?.errors.payload?.email}
      />
    </CCol>
    <CCol lg={6} className="mb-3">
      <CFormLabel>First Name</CFormLabel>
      <CFormInput
        name="payload.first_name"
        placeholder="Ray"
        value={form?.values.payload.first_name ?? ''}
        onChange={form?.handleChange}
        disabled={loading}
        invalid={!!form?.errors.payload?.first_name}
      />
    </CCol>
    <CCol lg={6} className="mb-3">
      <CFormLabel>Last Name</CFormLabel>
      <CFormInput
        name="payload.last_name"
        placeholder="Donovan"
        value={form?.values.payload.last_name ?? ''}
        onChange={form?.handleChange}
        disabled={loading}
        invalid={!!form?.errors.payload?.last_name}
      />
    </CCol>
    <CCol lg={6} className="mb-3">
      <CFormLabel>Phone</CFormLabel>
      <Phone
        specialLabel=""
        country="us"
        placeholder="555-555-5555"
        value={form?.values.payload.phone ?? ''}
        onChange={(v) =>
          form?.setFieldValue('payload.phone', phone(v).phoneNumber ?? v)
        }
        disabled={loading}
        invalid={!!form?.errors.payload?.phone}
      />
    </CCol>
    <CCol lg={12} className="mb-3">
      <CFormLabel>About</CFormLabel>
      <CFormTextarea
        name="payload.about"
        placeholder="Write something nice..."
        value={form?.values.payload.about ?? ''}
        onChange={form?.handleChange}
        disabled={loading}
        invalid={!!form?.errors.payload?.about}
      />
    </CCol>
  </CRow>
);
