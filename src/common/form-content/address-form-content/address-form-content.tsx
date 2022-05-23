import { CCol, CFormInput, CFormLabel, CFormSelect, CRow } from '@coreui/react';
import { FormikProps } from 'formik';
import { FC } from 'react';
import { usStatesArray } from 'src/common/data';
import {
  CreateUserInput,
  InviteUserInput,
  UpdateUserInput,
} from 'src/types/generated';

interface AddressFormContentProps {
  loading: boolean;
  form:
    | FormikProps<UpdateUserInput>
    | FormikProps<CreateUserInput>
    | FormikProps<InviteUserInput>
    | null;
}

export const AddressFormContent: FC<AddressFormContentProps> = ({
  form,
  loading,
}) => (
  <CRow>
    <CCol lg={12} className="mb-3">
      <CFormLabel>Line One</CFormLabel>
      <CFormInput
        placeholder="2356 Community Blvd."
        value={form?.values.payload.address?.lineOne}
        onChange={form?.handleChange}
        name="payload.address.lineOne"
        disabled={loading}
      />
    </CCol>
    <CCol lg={12} className="mb-3">
      <CFormLabel>Line Two</CFormLabel>
      <CFormInput
        placeholder="Apt. 10"
        value={form?.values.payload.address?.lineTwo ?? undefined}
        onChange={form?.handleChange}
        name="payload.address.lineTwo"
        disabled={loading}
      />
    </CCol>
    <CCol lg={12} className="mb-3">
      <CFormLabel>City</CFormLabel>
      <CFormInput
        placeholder="Dallas"
        value={form?.values.payload.address?.city}
        onChange={form?.handleChange}
        name="payload.address.city"
        disabled={loading}
      />
    </CCol>
    <CCol className="mb-3">
      <CFormLabel>State</CFormLabel>
      <CFormSelect
        placeholder="State"
        onChange={form?.handleChange}
        name="payload.address.state"
        value={form?.values.payload.address?.state}
        disabled={loading}
      >
        <option value="">State</option>
        {usStatesArray.map((s) => (
          <option key={s.code} value={s.name}>
            {s.name}
          </option>
        ))}
      </CFormSelect>
    </CCol>
    <CCol className="mb-3">
      <CFormLabel>Zip</CFormLabel>
      <CFormInput
        placeholder="17171"
        onChange={form?.handleChange}
        value={form?.values.payload.address?.zip}
        name="payload.address.zip"
        disabled={loading}
      />
    </CCol>
  </CRow>
);
