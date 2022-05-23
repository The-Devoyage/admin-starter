import {
  CAlert,
  CAlertHeading,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CCol,
  CRow,
} from '@coreui/react';
import { FC } from 'react';
import { Providers } from 'src/apollo';
import { Utils } from 'src/common';
import { UserOverviewCard } from 'src/components/users';
import { AccountPage_GetAccountsQuery } from 'src/types/generated';
import { AccountOverviewCardLoading } from './account-overview-card-loading';

interface AccountOverviewCardProps {
  account: AccountPage_GetAccountsQuery['getAccounts']['data'][0] | null;
  defaultUser:
    | AccountPage_GetAccountsQuery['getAccounts']['data'][0]['users']['data'][0]
    | null;
  loading: boolean;
}

export const AccountOverviewCard: FC<AccountOverviewCardProps> = ({
  loading,
  defaultUser,
  account,
}) => {
  if (loading) {
    return <AccountOverviewCardLoading />;
  }

  return (
    <CCard>
      <CRow className="g-0">
        <CCol md={4}>
          <CCardBody>
            <CRow className="align-items-center">
              <CCol xs={8}>
                <CCardTitle>
                  {`${Utils.Users.determineName(
                    account,
                    defaultUser,
                  )}'s Account`}
                </CCardTitle>
              </CCol>
              <CCol
                xs={4}
                className="d-flex align-self-start justify-content-end"
              >
                <CBadge color="primary">
                  {`${account?.users.stats.total ?? 0} Users`}
                </CBadge>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>ID</CCol>
              <CCol className="d-flex justify-content-end">
                {account?._id ?? '--'}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>Email</CCol>
              <CCol className="d-flex justify-content-end">
                {account?.email ?? '--'}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>Created</CCol>
              <CCol className="d-flex justify-content-end">
                {Utils.Format.Date.toLocalDateString(account?.createdAt) ??
                  '--'}
              </CCol>
            </CRow>
            <CRow className="mb-3 text-left">
              <CCol>Last Updated</CCol>
              <CCol className="d-flex justify-content-end">
                {Utils.Format.Date.toLocalDateString(account?.updatedAt) ??
                  '--'}
              </CCol>
            </CRow>
          </CCardBody>
        </CCol>
        <CCol md={8}>
          <CCardBody className="h-100 d-flex flex-column justify-content-center">
            {defaultUser ? (
              <UserOverviewCard user={defaultUser} loading={loading} />
            ) : (
              <Providers.Users.Mutations.CreateUserProviderContext.Consumer>
                {({ setCreateUserModalVisible }) => (
                  <CAlert
                    color="info"
                    className="d-flex flex-column justify-content-between h-100 mb-0"
                  >
                    <CRow className="mb-3">
                      <CAlertHeading>Default User Not Found</CAlertHeading>
                      <CCol lg={8}>
                        <span>
                          This account does not have a default user. A default
                          user is automatically created when the user logs in
                          for the first time.
                        </span>
                      </CCol>
                    </CRow>
                    <CRow className="d-flex align-items-end">
                      <CCol lg={8} />
                      <CCol lg={4} className="align-self-end">
                        <CButton
                          className="w-100"
                          onClick={() => setCreateUserModalVisible(true)}
                        >
                          Create Default User
                        </CButton>
                      </CCol>
                    </CRow>
                  </CAlert>
                )}
              </Providers.Users.Mutations.CreateUserProviderContext.Consumer>
            )}
          </CCardBody>
        </CCol>
      </CRow>
    </CCard>
  );
};
