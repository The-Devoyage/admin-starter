import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react';
import { FC } from 'react';
import { Providers } from 'src/apollo';
import { Utils } from 'src/common';
import { VerifyButton } from 'src/common/buttons';
import { Activation } from 'src/types/generated';

interface AccountActivationCardProps {
  activation?: Activation | null;
  loading: boolean;
}

export const AccountActivationCard: FC<AccountActivationCardProps> = ({
  activation,
  loading,
}) => (
  <Providers.Accounts.Mutations.ResetActivationCodeProviderContext.Consumer>
    {({ form, loading: submitting }) => (
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
            disabled={submitting || loading}
            onClick={form?.submitForm}
          >
            Reset
          </VerifyButton>
        </CCardFooter>
      </CCard>
    )}
  </Providers.Accounts.Mutations.ResetActivationCodeProviderContext.Consumer>
);
