import { CCol, CFormInput, CFormLabel, CFormSelect, CRow } from '@coreui/react';
import { FormikProps } from 'formik';
import { FC } from 'react';
import { usStatesArray, countries } from 'src/common/data';
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
}) => {
  return (
    <CRow>
      <CCol lg={12} className="mb-3">
        <CFormLabel>Country</CFormLabel>
        <CFormSelect
          placeholder="Country"
          value={form?.values.payload.address?.country ?? undefined}
          onChange={form?.handleChange}
          name="payload.address.country"
        >
          <option>Country</option>
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </CFormSelect>
      </CCol>
      <CCol lg={12} className="mb-3">
        <CFormLabel>Line One</CFormLabel>
        <CFormInput
          placeholder="2356 Community Blvd."
          value={form?.values.payload.address?.lineOne ?? undefined}
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
          value={form?.values.payload.address?.city ?? undefined}
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
          value={form?.values.payload.address?.state ?? undefined}
          disabled={loading || form?.values.payload.address?.country !== 'US'}
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
          value={form?.values.payload.address?.zip ?? undefined}
          name="payload.address.zip"
          disabled={loading}
          pattern="[0-9]{5}"
          title="Five digit zip code"
        />
      </CCol>
    </CRow>
  );
};
