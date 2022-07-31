import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react';
import { FormikProps } from 'formik';
import { FC } from 'react';
import { Utils } from 'src/common';
import { VerifyButton } from 'src/common/buttons';
import { Activation, ResetCodeInput } from 'src/types/generated';

interface AccountActivationCardProps {
  activation?: Activation | null;
  loading: boolean;
  form: FormikProps<ResetCodeInput> | null;
}

export const AccountActivationCard: FC<AccountActivationCardProps> = ({
  activation,
  loading,
  form,
}) => (
  <CCard>
    <CCardHeader>Activation Details</CCardHeader>
    <CCardBody>
      <CRow>
        <CCol>Verified</CCol>
        <CCol>{activation?.verified.toString()}</CCol>
      </CRow>
      <CRow>
        <CCol>Activation Code</CCol>
        <CCol>{activation?.code ?? '--'}</CCol>
      </CRow>
      <CRow>
        <CCol>Activation Code Expires</CCol>
        <CCol>
          {Utils.Format.Date.toLocalDateString(activation?.limit, {
            includeTime: true,
          }) ?? '--'}
        </CCol>
      </CRow>
    </CCardBody>
    <CCardFooter className="d-flex justify-content-end">
      <VerifyButton
        warning="This will require the user to re-verify their account."
        disabled={loading}
        onClick={form?.submitForm}
      >
        Reset
      </VerifyButton>
    </CCardFooter>
  </CCard>
);
