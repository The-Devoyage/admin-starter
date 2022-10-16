import {
  CCol,
  CFormInput,
  CFormLabel,
  CRow,
  CFormTextarea,
} from '@coreui/react';
import { FormikProps } from 'formik';
import phone from 'phone';
import { FC } from 'react';
import { Phone } from 'src/common/inputs/phone/phone';
import { InviteUserInput, UpdateUserInput } from 'src/types/generated';

interface UserMembershipLocalFormContentProps {
  form: FormikProps<UpdateUserInput> | FormikProps<InviteUserInput> | null;
  loading: boolean;
}

export const UserMembershipLocalFormContent: FC<
  UserMembershipLocalFormContentProps
> = ({ form, loading }) => (
  <CRow className="mb-3">
    <CCol lg={6} className="mb-3">
      <CFormLabel>First Name</CFormLabel>
      <CFormInput
        name="payload.memberships.local.first_name"
        placeholder="Ray"
        value={form?.values.payload.memberships?.local?.first_name ?? ''}
        onChange={form?.handleChange}
        disabled={loading}
        invalid={
          !!(
            form?.errors.payload
              ?.memberships as InviteUserInput['payload']['memberships']
          )?.local?.first_name
        }
      />
    </CCol>
    <CCol lg={6} className="mb-3">
      <CFormLabel>Last Name</CFormLabel>
      <CFormInput
        name="payload.memberships.local.last_name"
        placeholder="Donovan"
        value={form?.values.payload.memberships?.local?.last_name ?? ''}
        onChange={form?.handleChange}
        disabled={loading}
        invalid={
          !!(
            form?.errors.payload
              ?.memberships as InviteUserInput['payload']['memberships']
          )?.local?.last_name
        }
      />
    </CCol>
    <CCol lg={6} className="mb-3">
      <CFormLabel>Phone</CFormLabel>
      <Phone
        value={form?.values.payload.memberships?.local?.phone ?? ''}
        onChange={(v) =>
          form?.setFieldValue(
            'payload.memberships.local.phone',
            phone(v).phoneNumber ?? v,
          )
        }
        disabled={loading}
        invalid={
          !!(
            form?.errors.payload
              ?.memberships as InviteUserInput['payload']['memberships']
          )?.local?.phone
        }
      />
    </CCol>
    <CCol lg={12}>
      <CFormLabel>About</CFormLabel>
      <CFormTextarea
        name="payload.memberships.local.about"
        placeholder="Write something nice..."
        value={form?.values.payload.memberships?.local?.about ?? ''}
        onChange={form?.handleChange}
        disabled={loading}
        invalid={
          !!(
            form?.errors.payload
              ?.memberships as InviteUserInput['payload']['memberships']
          )?.local?.about
        }
      />
    </CCol>
  </CRow>
);
